
DROP POLICY IF EXISTS "Anyone can view approved comments" ON public.analysis_comments;
REVOKE SELECT ON public.analysis_comments FROM anon;

CREATE OR REPLACE VIEW public.analysis_comments_public
WITH (security_invoker = true) AS
SELECT id, article_slug, author_name, content, created_at
FROM public.analysis_comments
WHERE approved = true;

CREATE POLICY "Public can view approved comments (safe cols)"
  ON public.analysis_comments FOR SELECT
  TO anon, authenticated
  USING (approved = true);

-- The above policy still exposes email via table. Instead restrict SELECT to admins,
-- and rely on the view for public reads. Drop and recreate accordingly:
DROP POLICY IF EXISTS "Public can view approved comments (safe cols)" ON public.analysis_comments;

GRANT SELECT ON public.analysis_comments_public TO anon, authenticated;
