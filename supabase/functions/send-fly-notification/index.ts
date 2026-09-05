import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { verifyFlySessionToken } from '../_shared/fly-session.ts'

// Server-side handler for /fly submissions. Requires the HMAC session token
// issued by fly-session-init, so the fly-contact-notification template (which
// carries free-text form data) cannot be triggered by arbitrary internet
// callers. Signed download URLs for uploaded documents are generated here
// with the service role, then handed to send-transactional-email as
// pre-signed https URLs — the client never calls the signing function.

const BUCKET = 'fly-documents'
const SIGNED_URL_TTL_SECONDS = 7 * 24 * 60 * 60 // 7 days
const RECIPIENTS = ['info@businessmatching.global', 'enstobbi@enstobbi.it']
const MAX_PATHS = 60

const N8N_WEBHOOK_URL = Deno.env.get('N8N_FLY_WEBHOOK_URL')
const N8N_WEBHOOK_SECRET = Deno.env.get('N8N_FLY_WEBHOOK_SECRET')
// By default send BOTH the n8n webhook and the email notification.
// Set FLY_WEBHOOK_ONLY=true to send only to n8n.
const WEBHOOK_ONLY = Deno.env.get('FLY_WEBHOOK_ONLY') === 'true'


function isSafePath(submissionId: string, p: unknown): p is string {
  return typeof p === 'string'
    && p.length > 0
    && p.length < 512
    && !p.startsWith('/')
    && p.startsWith(`${submissionId}/`)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: any
  try { body = await req.json() } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const submissionId = String(body?.submissionId ?? '')
  const sessionToken = String(body?.sessionToken ?? '')
  const templateData = body?.templateData
  const documentGroups = Array.isArray(body?.documentGroups) ? body.documentGroups : []

  if (!/^[0-9a-f-]{36}$/i.test(submissionId)) {
    return new Response(JSON.stringify({ error: 'Invalid submissionId' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const ok = await verifyFlySessionToken(submissionId, sessionToken)
  if (!ok) {
    return new Response(JSON.stringify({ error: 'Invalid or expired session token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  if (!templateData || typeof templateData !== 'object') {
    return new Response(JSON.stringify({ error: 'Missing templateData' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Collect and validate all paths that need signing.
  const allPaths: string[] = []
  for (const g of documentGroups) {
    if (g?.passportPath && isSafePath(submissionId, g.passportPath)) allPaths.push(g.passportPath)
    if (Array.isArray(g?.residencePaths)) {
      for (const p of g.residencePaths) {
        if (isSafePath(submissionId, p)) allPaths.push(p)
      }
    }
  }
  if (allPaths.length > MAX_PATHS) {
    return new Response(JSON.stringify({ error: 'Too many documents' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const pathToUrl = new Map<string, string>()
  if (allPaths.length > 0) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrls(allPaths, SIGNED_URL_TTL_SECONDS)
    if (error) {
      console.error('createSignedUrls failed', error)
      return new Response(JSON.stringify({ error: 'Failed to sign document URLs' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    for (let i = 0; i < (data ?? []).length; i++) {
      const d = data![i]
      if (d?.signedUrl) pathToUrl.set(allPaths[i], d.signedUrl)
    }
  }

  const documents = documentGroups.map((g: any, i: number) => ({
    n: i + 1,
    passportUrl: g?.passportPath ? (pathToUrl.get(g.passportPath) ?? '') : '',
    residenceUrls: Array.isArray(g?.residencePaths)
      ? g.residencePaths.map((p: string) => pathToUrl.get(p)).filter((u: string | undefined): u is string => !!u)
      : [],
    ackNoDocs: !!g?.ackNoDocs,
  }))

  const fullTemplateData = { ...templateData, documents }
  const baseIdempotencyKey = `fly-${submissionId}`

  // Forward the submission to n8n when configured. The signed document URLs
  // are included in the payload so the receiving workflow can access them.
  let webhookResult: { ok: boolean; status?: number; error?: string } | undefined
  if (N8N_WEBHOOK_URL) {
    try {
      const webhookHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': 'business-matching-global-edge/1.0',
      }
      if (N8N_WEBHOOK_SECRET) {
        webhookHeaders['Authorization'] = `Bearer ${N8N_WEBHOOK_SECRET}`
      }
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: webhookHeaders,
        body: JSON.stringify({
          submissionId,
          submittedAt: new Date().toISOString(),
          templateData: fullTemplateData,
        }),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.error('n8n webhook failed', { status: res.status, text })
        webhookResult = { ok: false, status: res.status, error: `status_${res.status}` }
      } else {
        webhookResult = { ok: true, status: res.status }
      }
    } catch (err) {
      console.error('n8n webhook invoke error', err)
      webhookResult = { ok: false, error: 'network' }
    }
  }

  // Send the fly-contact-notification template through Lovable's managed email
  // API. Email is skipped by default when an n8n webhook is configured; set
  // FLY_WEBHOOK_ONLY=false to keep both channels.
  const sendResults: Array<{ recipient: string; ok: boolean; error?: string }> = []
  const shouldEmail = !N8N_WEBHOOK_URL || !WEBHOOK_ONLY
  if (shouldEmail) {
    for (let i = 0; i < RECIPIENTS.length; i++) {
      const recipient = RECIPIENTS[i]
      try {
        const result = await sendTemplateEmailLogged('fly-contact-notification', recipient, {
          idempotencyKey: `${baseIdempotencyKey}-${i}`,
          templateData: fullTemplateData,
        })
        if (!result.sent) {
          console.warn('fly notification suppressed for recipient')
          sendResults.push({ recipient, ok: false, error: 'recipient_suppressed' })
        } else {
          sendResults.push({ recipient, ok: true })
        }
      } catch (err) {
        console.error('fly notification send failed', err)
        sendResults.push({ recipient, ok: false, error: 'send_failed' })
      }
    }
  }

  const allOk = (webhookResult ? webhookResult.ok : true) && (shouldEmail ? sendResults.every((r) => r.ok) : true)
  return new Response(JSON.stringify({ ok: allOk, webhook: webhookResult, results: sendResults }), {
    status: allOk ? 200 : 502,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})