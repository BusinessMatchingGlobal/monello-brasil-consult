DROP POLICY IF EXISTS "Anyone can subscribe with valid email" ON public.newsletter_subscribers;
REVOKE INSERT ON public.newsletter_subscribers FROM anon;