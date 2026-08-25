select cron.schedule(
  'ask-bmg-weekly-digest',
  '0 7 * * 1',
  $$
  select net.http_post(
    url := 'https://odiioicjwwjdrqqhsgwq.supabase.co/functions/v1/assistant-weekly-digest',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        select decrypted_secret from vault.decrypted_secrets where name = 'email_queue_service_role_key'
      )
    ),
    body := '{}'::jsonb
  );
  $$
);