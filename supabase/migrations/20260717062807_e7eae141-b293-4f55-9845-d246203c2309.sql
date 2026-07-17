DO $$
BEGIN
  GRANT SELECT ON TABLE public.newsletter_subscribers TO authenticated;
  GRANT SELECT ON TABLE public.user_roles TO authenticated;
  GRANT ALL PRIVILEGES ON TABLE public.newsletter_subscribers TO service_role;
  GRANT ALL PRIVILEGES ON TABLE public.user_roles TO service_role;
END $$;