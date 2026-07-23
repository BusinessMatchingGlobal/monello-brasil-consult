
CREATE TABLE public.analysis_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug text NOT NULL,
  author_name text NOT NULL,
  author_email text,
  content text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  CONSTRAINT analysis_comments_name_len CHECK (char_length(author_name) BETWEEN 1 AND 100),
  CONSTRAINT analysis_comments_content_len CHECK (char_length(content) BETWEEN 1 AND 2000),
  CONSTRAINT analysis_comments_slug_len CHECK (char_length(article_slug) BETWEEN 1 AND 100),
  CONSTRAINT analysis_comments_email_len CHECK (author_email IS NULL OR char_length(author_email) <= 255)
);

CREATE INDEX analysis_comments_slug_approved_idx
  ON public.analysis_comments (article_slug, approved, created_at DESC);

GRANT SELECT, INSERT ON public.analysis_comments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analysis_comments TO authenticated;
GRANT ALL ON public.analysis_comments TO service_role;

ALTER TABLE public.analysis_comments ENABLE ROW LEVEL SECURITY;

-- Public can read only approved comments
CREATE POLICY "Anyone can view approved comments"
  ON public.analysis_comments FOR SELECT
  USING (approved = true);

-- Admins can read everything (including pending)
CREATE POLICY "Admins can view all comments"
  ON public.analysis_comments FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can submit a comment, but it MUST start as not approved
CREATE POLICY "Anyone can submit a pending comment"
  ON public.analysis_comments FOR INSERT
  WITH CHECK (approved = false AND approved_at IS NULL);

-- Only admins can update (approve/edit) comments
CREATE POLICY "Admins can update comments"
  ON public.analysis_comments FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete comments
CREATE POLICY "Admins can delete comments"
  ON public.analysis_comments FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
