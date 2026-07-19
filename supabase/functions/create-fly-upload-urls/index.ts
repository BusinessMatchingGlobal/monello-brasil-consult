import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const BUCKET = 'fly-documents'
const MAX_FILES = 30
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
const ALLOWED_EXT = /^(jpg|jpeg|png|webp|pdf)$/i

type Requested = { path: string; contentType?: string; size?: number }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  try {
    const { submissionId, files } = await req.json()
    if (
      typeof submissionId !== 'string' ||
      !/^[0-9a-f-]{36}$/i.test(submissionId) ||
      !Array.isArray(files) ||
      files.length === 0 ||
      files.length > MAX_FILES
    ) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const items: Requested[] = files
    for (const f of items) {
      if (typeof f.path !== 'string' || !f.path.startsWith(`${submissionId}/`) || f.path.length > 256) {
        return new Response(JSON.stringify({ error: 'Invalid path' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const ext = f.path.split('.').pop() ?? ''
      if (!ALLOWED_EXT.test(ext)) {
        return new Response(JSON.stringify({ error: 'Unsupported file extension' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      if (f.contentType && !ALLOWED_MIME.has(f.contentType)) {
        return new Response(JSON.stringify({ error: 'Unsupported content type' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      if (typeof f.size === 'number' && f.size > MAX_SIZE) {
        return new Response(JSON.stringify({ error: 'File too large' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const uploads: Array<{ path: string; token: string }> = []
    for (const f of items) {
      const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(f.path)
      if (error || !data) throw error ?? new Error('Failed to create upload URL')
      uploads.push({ path: data.path, token: data.token })
    }

    return new Response(JSON.stringify({ uploads }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('create-fly-upload-urls error', err)
    return new Response(JSON.stringify({ error: 'Failed to create upload URLs' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})