import { createEmailWebhookHandler } from 'npm:@lovable.dev/email-js@0.1.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

// Notification-only mirror of terminal email outcomes into the project's own
// history tables. Lovable enforces suppression at send time — these rows never
// gate a send.

type Reason = 'bounce' | 'complaint' | 'unsubscribe'

function statusFor(reason: Reason): 'bounced' | 'complained' | 'suppressed' {
  switch (reason) {
    case 'bounce':
      return 'bounced'
    case 'complaint':
      return 'complained'
    default:
      return 'suppressed'
  }
}

function messageFor(reason: Reason): string {
  switch (reason) {
    case 'bounce':
      return 'Permanent bounce — email address is invalid or rejected'
    case 'complaint':
      return 'Spam complaint — recipient marked email as spam'
    case 'unsubscribe':
      return 'Recipient unsubscribed'
    default:
      return 'Email suppressed'
  }
}

function client() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    throw new Error('Missing Supabase environment variables')
  }
  return createClient(supabaseUrl, serviceKey)
}

async function record(reason: Reason, event: any) {
  const supabase = client()
  const email = String(event?.data?.recipient ?? '').toLowerCase()
  if (!email) {
    throw new Error('Event carried no recipient')
  }

  const { error: suppressError } = await supabase
    .from('suppressed_emails')
    .upsert({ email, reason, metadata: null }, { onConflict: 'email' })

  if (suppressError) {
    console.error('Failed to upsert suppressed email', {
      code: suppressError.code,
      message: suppressError.message,
      event_id: event.event_id,
    })
    throw new Error('Failed to record suppression')
  }

  if (reason === 'unsubscribe') {
    const { error: tokenError } = await supabase
      .from('email_unsubscribe_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('email', email)
      .is('used_at', null)
    if (tokenError) {
      console.warn('Failed to stamp unsubscribe token', {
        code: tokenError.code,
        message: tokenError.message,
        event_id: event.event_id,
      })
    }
  }

  const { error: logError } = await supabase.from('email_send_log').insert({
    message_id: event?.data?.message_id ?? null,
    template_name: 'system',
    recipient_email: email,
    status: statusFor(reason),
    error_message: messageFor(reason),
    metadata: null,
  })

  if (logError) {
    console.warn('Failed to insert email_send_log', {
      code: logError.code,
      message: logError.message,
      event_id: event.event_id,
    })
  }
}

const handler = createEmailWebhookHandler({
  apiKey: Deno.env.get('LOVABLE_API_KEY')!,
  on: {
    'email.bounced': async (event) => {
      await record('bounce', event)
    },
    'email.complaint': async (event) => {
      await record('complaint', event)
    },
    'email.unsubscribed': async (event) => {
      await record('unsubscribe', event)
    },
  },
})

Deno.serve((req) => handler(req))
