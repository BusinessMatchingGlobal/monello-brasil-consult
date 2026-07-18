
-- fly-documents bucket is private. Uploads (INSERT) are open to anon/authenticated
-- (write-only intake form). Client-side reads are NOT expected: downloads happen via
-- signed URLs generated server-side by the sign-fly-documents edge function using
-- service_role (which bypasses RLS).
-- Add explicit admin-only SELECT/UPDATE/DELETE policies so authenticated admins can
-- audit, manage, or remove uploaded documents from an admin interface, while
-- preventing any other authenticated or anonymous user from listing or reading files.

CREATE POLICY "Admins can read fly documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'fly-documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update fly documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'fly-documents' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'fly-documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete fly documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'fly-documents' AND public.has_role(auth.uid(), 'admin'));
