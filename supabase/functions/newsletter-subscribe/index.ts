import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const APP_ORIGIN = 'https://businessmatching.global'

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
    console.warn('Newsletter subscribe blocked by suppression', { email })
    // Return ok to avoid enumeration
    return json(200, { ok: true })
  }

  // Check existing subscriber
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('id, status')
    .ilike('email', email)
    .limit(1)
    .maybeSingle()

  if (existing?.status === 'confirmed') {
    return json(200, { ok: true, alreadyConfirmed: true })
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

  let upsertError: unknown = null
  if (existing?.id) {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update(row)
      .eq('id', existing.id)
    upsertError = error
  } else {
    const { error } = await supabase.from('newsletter_subscribers').insert(row)
    upsertError = error
  }
  if (upsertError) {
    console.error('Failed to save subscriber', upsertError)
    return json(500, { error: 'save_failed' })
  }

  const confirmUrl = `${APP_ORIGIN}/newsletter/confirm?token=${token}`

  const { error: sendError } = await supabase.functions.invoke('send-transactional-email', {
    headers: { Authorization: `Bearer ${serviceKey}` },
    body: {
      templateName: 'newsletter-confirm',
      recipientEmail: email,
      idempotencyKey: `newsletter-confirm-${token}`,
      templateData: {
        firstName,
        confirmUrl,
        language,
        newsletterName,
      },
    },
  })
  if (sendError) {
    console.error('Failed to send confirmation email', sendError)
    return json(500, { error: 'email_send_failed' })
  }

  return json(200, { ok: true })
})