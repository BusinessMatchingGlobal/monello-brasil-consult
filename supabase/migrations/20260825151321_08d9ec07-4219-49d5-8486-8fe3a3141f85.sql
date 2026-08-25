CREATE TABLE public.topic_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  email text NOT NULL,
  language text,
  consent boolean NOT NULL DEFAULT false,
  newsletter_subscribed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.topic_requests TO authenticated;
GRANT ALL ON public.topic_requests TO service_role;

ALTER TABLE public.topic_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read topic requests"
ON public.topic_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX topic_requests_created_at_idx ON public.topic_requests (created_at DESC);