// Shared HMAC session token utilities for the /fly flow.
//
// Token format: `${expiresAtMs}.${hexHmac}` where hexHmac is HMAC-SHA256 over
// the string `${submissionId}.${expiresAtMs}` using FLY_SESSION_SECRET.
// The token is issued by `fly-session-init` and required by
// `create-fly-upload-urls` and `send-fly-notification` so anonymous callers
// cannot mint arbitrary submissionIds to abuse private storage or the
// verified sender domain.

const encoder = new TextEncoder()

function toHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let out = ''
  for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0')
  return out
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function issueFlySessionToken(submissionId: string, ttlMs = 30 * 60 * 1000): Promise<string> {
  const secret = Deno.env.get('FLY_SESSION_SECRET')
  if (!secret) throw new Error('FLY_SESSION_SECRET not configured')
  const expiresAt = Date.now() + ttlMs
  const key = await importKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(`${submissionId}.${expiresAt}`))
  return `${expiresAt}.${toHex(sig)}`
}

export async function verifyFlySessionToken(submissionId: string, token: string): Promise<boolean> {
  const secret = Deno.env.get('FLY_SESSION_SECRET')
  if (!secret) return false
  if (typeof token !== 'string' || token.length < 20 || token.length > 512) return false
  const dot = token.indexOf('.')
  if (dot <= 0) return false
  const expiresAtStr = token.slice(0, dot)
  const providedHex = token.slice(dot + 1)
  const expiresAt = Number(expiresAtStr)
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false
  const key = await importKey(secret)
  const expectedBuf = await crypto.subtle.sign('HMAC', key, encoder.encode(`${submissionId}.${expiresAt}`))
  return timingSafeEqualHex(toHex(expectedBuf), providedHex)
}