-- Extend newsletter_subscribers for double opt-in
ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS confirmation_token text,
  ADD COLUMN IF NOT EXISTS confirmed_at timestamptz,
  ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS unsubscribed_at timestamptz,
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS user_agent text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';

-- Enforce one row per email (allows re-subscribe via upsert by service role)
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_key
  ON public.newsletter_subscribers (lower(email));

CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_token_key
  ON public.newsletter_subscribers (confirmation_token)
  WHERE confirmation_token IS NOT NULL;

-- Ensure service role can manage rows (needed by edge functions)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.newsletter_subscribers TO service_role;

-- Service role read/update policies for the confirm/unsubscribe flow
DROP POLICY IF EXISTS "Service role manages subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Service role manages subscribers"
  ON public.newsletter_subscribers
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');