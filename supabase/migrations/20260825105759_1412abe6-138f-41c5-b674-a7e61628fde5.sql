CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT,
  contact_name TEXT,
  email TEXT,
  country TEXT,
  sector TEXT,
  goal TEXT,
  message TEXT,
  language TEXT,
  service TEXT,
  qualification JSONB,
  source TEXT NOT NULL DEFAULT 'mcp',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.consultation_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultation_requests TO authenticated;
GRANT ALL ON public.consultation_requests TO service_role;

ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a consultation request"
ON public.consultation_requests FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read consultation requests"
ON public.consultation_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update consultation requests"
ON public.consultation_requests FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete consultation requests"
ON public.consultation_requests FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));