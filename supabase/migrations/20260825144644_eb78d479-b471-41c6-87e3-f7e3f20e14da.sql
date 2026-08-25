CREATE TABLE public.assistant_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  language text,
  slugs text[] NOT NULL DEFAULT '{}',
  covered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.assistant_questions TO authenticated;
GRANT ALL ON public.assistant_questions TO service_role;

ALTER TABLE public.assistant_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read assistant questions"
ON public.assistant_questions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.assistant_rate_limits (
  ip_hash text NOT NULL,
  day date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (ip_hash, day)
);

GRANT ALL ON public.assistant_rate_limits TO service_role;
ALTER TABLE public.assistant_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.assistant_bump_rate_limit(_ip_hash text, _limit integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  INSERT INTO public.assistant_rate_limits (ip_hash, day, count)
  VALUES (_ip_hash, (now() AT TIME ZONE 'utc')::date, 1)
  ON CONFLICT (ip_hash, day)
  DO UPDATE SET count = public.assistant_rate_limits.count + 1
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.assistant_bump_rate_limit(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.assistant_bump_rate_limit(text, integer) TO service_role;