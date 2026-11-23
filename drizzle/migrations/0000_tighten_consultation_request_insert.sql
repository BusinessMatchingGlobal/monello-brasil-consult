DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultation_requests;

CREATE POLICY "Anyone can submit a valid consultation request"
ON public.consultation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) <= 320
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND source = 'mcp'
  AND status = 'new'
  AND qualification IS NULL
  AND (language IS NULL OR language IN ('it', 'en', 'pt', 'es'))
  AND coalesce(length(company_name), 0) <= 200
  AND coalesce(length(contact_name), 0) <= 200
  AND coalesce(length(country), 0) <= 120
  AND coalesce(length(sector), 0) <= 300
  AND coalesce(length(goal), 0) <= 1000
  AND coalesce(length(service), 0) <= 200
  AND coalesce(length(message), 0) <= 4000
);