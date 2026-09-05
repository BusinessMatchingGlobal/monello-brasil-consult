import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmailLogged } from '../_shared/transactional-email-templates/log-send.ts'

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  let token = ''
  if (req.method === 'GET') {
    token = new URL(req.url).searchParams.get('token') ?? ''
  } else if (req.method === 'POST') {
    try {
      const body = await req.json()
      token = String(body?.token ?? '')
    } catch { /* ignore */ }
  } else {
    return json(405, { error: 'Method not allowed' })
  }

  token = token.trim()
  if (!token || token.length < 32 || token.length > 128) {
    return json(400, { error: 'invalid_token' })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) return json(500, { error: 'Server configuration error' })

  const supabase = createClient(supabaseUrl, serviceKey)

  const { data: sub, error: readErr } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, first_name, last_name, language, source, status, confirmed_at, ip_address')
    .eq('confirmation_token', token)
    .maybeSingle()

  if (readErr) {
    console.error('read subscriber failed', readErr)
    return json(500, { error: 'lookup_failed' })
  }
  if (!sub) return json(404, { error: 'not_found' })

  if (sub.status === 'confirmed') {
    return json(200, { ok: true, alreadyConfirmed: true, email: sub.email })
  }

  const now = new Date().toISOString()
  const { error: updErr } = await supabase
    .from('newsletter_subscribers')
    .update({
      status: 'confirmed',
      confirmed_at: now,
      confirmation_token: null,
    })
    .eq('id', sub.id)

  if (updErr) {
    console.error('confirm update failed', updErr)
    return json(500, { error: 'confirm_failed' })
  }

  // Notify owner (do not block on failure)
  try {
    await supabase.functions.invoke('send-transactional-email', {
      headers: { Authorization: `Bearer ${serviceKey}` },
      body: {
        templateName: 'newsletter-owner-notification',
        idempotencyKey: `newsletter-owner-${sub.id}`,
        templateData: {
          firstName: sub.first_name ?? '',
          lastName: sub.last_name ?? '',
          email: sub.email,
          language: sub.language ?? '',
          source: sub.source ?? 'Newsletter popup',
          confirmedAt: now,
          ipAddress: sub.ip_address ?? '',
        },
      },
    })
  } catch (e) {
    console.warn('owner notification failed', e)
  }

  // Follow-up to the subscriber: confirmation + travel desk reminder
  try {
    await supabase.functions.invoke('send-transactional-email', {
      headers: { Authorization: `Bearer ${serviceKey}` },
      body: {
        templateName: 'newsletter-travel-desk',
        recipientEmail: sub.email,
        idempotencyKey: `newsletter-travel-desk-${sub.id}`,
        templateData: {
          firstName: sub.first_name ?? '',
          language: ['it', 'en', 'pt'].includes(sub.language ?? '') ? sub.language : 'it',
        },
      },
    })
  } catch (e) {
    console.warn('travel desk follow-up failed', e)
  }

  return json(200, { ok: true, email: sub.email })
})