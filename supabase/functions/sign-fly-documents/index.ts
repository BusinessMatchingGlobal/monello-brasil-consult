import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const BUCKET = 'fly-documents'
const EXPIRES_IN = 60 * 60 * 24 * 30 // 30 days

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
  try {
    const { paths } = await req.json()
    if (!Array.isArray(paths) || paths.length === 0) {
      return new Response(JSON.stringify({ urls: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    // Sanitize: only accept string paths that look like uuid-prefixed keys.
    const safe = paths.filter(
      (p): p is string => typeof p === 'string' && p.length > 0 && p.length < 512 && !p.startsWith('/'),
    )
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrls(safe, EXPIRES_IN)
    if (error) throw error
    const urls: Array<{ path: string; url: string }> = []
    for (let i = 0; i < (data ?? []).length; i++) {
      const d = data![i]
      // Supabase returns path without leading slash matching the input path.
      const originalPath = safe[i]
      if (d?.signedUrl) {
        urls.push({ path: originalPath, url: d.signedUrl })
      } else {
        console.error('sign-fly-documents: missing signed URL', { path: originalPath, error: d?.error })
      }
    }
    return new Response(JSON.stringify({ urls }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('sign-fly-documents error', err)
    return new Response(JSON.stringify({ error: 'Failed to sign URLs' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})