import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmailLogged } from '../_shared/transactional-email-templates/log-send.ts'

// Public contact-form notification sender. The recipient is fixed by the
// template (site owner) — callers can never choose it. Input is validated,
// length-capped and rate-limited per IP.

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT_MAX
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function str(value: unknown, max: number): string {
  return String(value ?? '').trim().slice(0, max)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) return json(429, { error: 'rate_limited' })

  let body: any
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Invalid JSON' })
  }

  const data = body?.templateData ?? {}
  const name = str(data.name, 120)
  const email = str(data.email, 254)
  const message = str(data.message, 5000)
  const company = str(data.company, 160) || '—'
  const source = str(data.source, 120) || 'Website'
  const language = str(data.language, 8)
  const submittedAt = str(data.submittedAt, 40) || new Date().toISOString()

  if (!name) return json(400, { error: 'missing_name' })
  if (!EMAIL_RE.test(email)) return json(400, { error: 'invalid_email' })
  if (!message) return json(400, { error: 'missing_message' })

  const idempotencyKey = str(body?.idempotencyKey, 120) || `contact-${crypto.randomUUID()}`

  try {
    const result = await sendTemplateEmailLogged('contact-notification', '', {
      templateData: { name, email, company, message, source, language, submittedAt },
      idempotencyKey,
      replyTo: email,
    })
    if (!result.sent) {
      console.warn('Contact notification suppressed')
      return json(200, { success: false, reason: 'recipient_suppressed' })
    }
    return json(200, { success: true })
  } catch (error) {
    console.error('Contact notification send failed', error)
    return json(502, { error: 'send_failed' })
  }
})
