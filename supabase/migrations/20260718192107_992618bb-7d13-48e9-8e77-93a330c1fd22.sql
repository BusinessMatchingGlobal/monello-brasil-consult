
-- Allow anonymous visitors to upload documents to the fly-documents bucket (write-only).
-- Reads are handled server-side by the edge function using service_role (signed URLs in emails).
CREATE POLICY "Anyone can upload fly documents"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'fly-documents');
