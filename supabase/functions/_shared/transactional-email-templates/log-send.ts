import { createClient } from 'npm:@supabase/supabase-js@2'
import { TEMPLATES } from './registry.ts'
import { sendTemplateEmail, type SendTemplateEmailOptions, type SendTemplateEmailResult } from './send-email.ts'

// Server-only. Appends a row to email_send_log for each send outcome, then
// returns the send result unchanged. The log row is a history record only —
// it never decides whether an email was sent.

type LogStatus = 'sent' | 'suppressed' | 'failed'

async function writeLog(entry: {
  template_name: string
  recipient_email: string
  status: LogStatus
  error_message?: string
}) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    console.warn('email_send_log skipped: missing Supabase env')
    return
  }
  const supabase = createClient(supabaseUrl, serviceKey)
  const { error } = await supabase.from('email_send_log').insert({
    message_id: null,
    template_name: entry.template_name,
    recipient_email: entry.recipient_email,
    status: entry.status,
    error_message: entry.error_message ?? null,
  })
  if (error) {
    console.error('Failed to write email_send_log', { code: error.code, message: error.message })
  }
}

/**
 * Sends a registered template through the managed email API and records the
 * outcome in email_send_log. Throws whatever the send throws, after logging.
 */
export async function sendTemplateEmailLogged(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {},
): Promise<SendTemplateEmailResult> {
  const recipient = TEMPLATES[templateName]?.to || to
  try {
    const result = await sendTemplateEmail(templateName, to, options)
    await writeLog({
      template_name: templateName,
      recipient_email: recipient,
      status: result.sent ? 'sent' : 'suppressed',
    })
    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    await writeLog({
      template_name: templateName,
      recipient_email: recipient,
      status: 'failed',
      error_message: message.slice(0, 500),
    })
    throw error
  }
}
