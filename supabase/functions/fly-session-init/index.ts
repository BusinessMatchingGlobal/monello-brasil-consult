import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { issueFlySessionToken } from '../_shared/fly-session.ts'

// Issues a short-lived HMAC token tied to a freshly-minted submissionId.
// Downstream functions (create-fly-upload-urls, send-fly-notification) reject
// callers that do not present a matching valid token, so anonymous internet
// visitors cannot invent submissionIds to abuse storage or email sending.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  try {
    const submissionId = crypto.randomUUID()
    const sessionToken = await issueFlySessionToken(submissionId)
    return new Response(JSON.stringify({ submissionId, sessionToken }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('fly-session-init error', err)
    return new Response(JSON.stringify({ error: 'Failed to initialize session' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})