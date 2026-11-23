import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmailLogged } from '../_shared/transactional-email-templates/log-send.ts'

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const APP_ORIGIN = 'https://businessmatching.global'
const RESEND_COOLDOWN_MS = 15 * 60 * 1000

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) return json(500, { error: 'Server configuration error' })

  let payload: any
  try { payload = await req.json() } catch { return json(400, { error: 'Invalid JSON' }) }

  const firstName = String(payload?.firstName ?? '').trim().slice(0, 80)
  const lastName = String(payload?.lastName ?? '').trim().slice(0, 80)
  const email = String(payload?.email ?? '').trim().toLowerCase().slice(0, 255)
  const language = ['it', 'en', 'pt'].includes(payload?.language) ? payload.language : 'it'
  const source = String(payload?.source ?? 'Newsletter popup').slice(0, 120)
  const newsletterName = String(payload?.newsletterName ?? '#CustoBrasil').slice(0, 40)
  const consent = payload?.consent === true

  if (!firstName || !lastName) return json(400, { error: 'missing_name' })
  if (!EMAIL_RE.test(email)) return json(400, { error: 'invalid_email' })
  if (!consent) return json(400, { error: 'consent_required' })

  const supabase = createClient(supabaseUrl, serviceKey)

  // Check suppression list
  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', email)
    .limit(1)
    .maybeSingle()
  if (suppressed) {
    console.warn('Newsletter subscribe blocked by suppression')
    // Return ok to avoid enumeration
    return json(200, { ok: true })
  }

  // Check existing subscriber
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id, status, first_name, language, confirmation_token, confirmation_sent_at')
    .ilike('email', email)
    .limit(1)
    .maybeSingle()

  if (existing?.status === 'confirmed') {
    return json(200, { ok: true, alreadyConfirmed: true })
  }

  // An existing signup is never overwritten with caller-supplied details:
  // the stored names, language and token stay as they are, and the original
  // confirmation email is re-sent at most once per RESEND_COOLDOWN_MS.
  if (existing?.id) {
    const lastSent = existing.confirmation_sent_at ? Date.parse(existing.confirmation_sent_at) : 0
    if (!existing.confirmation_token || Date.now() - lastSent < RESEND_COOLDOWN_MS) {
      return json(200, { ok: true })
    }
    const storedLanguage = ['it', 'en', 'pt'].includes(existing.language ?? '') ? existing.language : 'it'
    const { error: touchError } = await supabase
      .from('newsletter_subscribers')
      .update({ confirmation_sent_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (touchError) {
      console.error('Failed to update resend time', touchError)
      return json(500, { error: 'save_failed' })
    }
    try {
      await sendTemplateEmailLogged('newsletter-confirm', email, {
        idempotencyKey: `newsletter-confirm-${existing.confirmation_token}-${lastSent}`,
        templateData: {
          firstName: existing.first_name ?? '',
          confirmUrl: `${APP_ORIGIN}/newsletter/confirm?token=${existing.confirmation_token}`,
          language: storedLanguage,
          newsletterName,
        },
      })
    } catch (sendError) {
      console.error('Failed to resend confirmation email', sendError)
      return json(500, { error: 'email_send_failed' })
    }
    return json(200, { ok: true })
  }

  const token = generateToken()
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const userAgent = req.headers.get('user-agent')?.slice(0, 500) ?? null
  const now = new Date().toISOString()

  const row = {
    email,
    first_name: firstName,
    last_name: lastName,
    language,
    source,
    consent: true,
    status: 'pending',
    confirmation_token: token,
    confirmation_sent_at: now,
    ip_address: ip,
    user_agent: userAgent,
  }

  const { error: insertError } = await supabase.from('newsletter_subscribers').insert(row)
  if (insertError) {
    console.error('Failed to save subscriber', insertError)
    return json(500, { error: 'save_failed' })
  }

  const confirmUrl = `${APP_ORIGIN}/newsletter/confirm?token=${token}`

  try {
    await sendTemplateEmailLogged('newsletter-confirm', email, {
      idempotencyKey: `newsletter-confirm-${token}`,
      templateData: {
        firstName,
        confirmUrl,
        language,
        newsletterName,
      },
    })
  } catch (sendError) {
    console.error('Failed to send confirmation email', sendError)
    return json(500, { error: 'email_send_failed' })
  }

  return json(200, { ok: true })
})