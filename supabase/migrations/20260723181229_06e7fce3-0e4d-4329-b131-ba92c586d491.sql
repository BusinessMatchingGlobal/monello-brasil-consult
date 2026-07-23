-- Remove ability for anonymous/authenticated non-admin users to write the
-- author_email column and clear any previously stored addresses so no PII
-- is retained from public comment submissions.
REVOKE INSERT (author_email), UPDATE (author_email) ON public.analysis_comments FROM anon, authenticated;
UPDATE public.analysis_comments SET author_email = NULL WHERE author_email IS NOT NULL;