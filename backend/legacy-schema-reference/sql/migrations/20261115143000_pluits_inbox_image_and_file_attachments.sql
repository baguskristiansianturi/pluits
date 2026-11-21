-- Expand private Inbox media support from voice-only to photos and common documents.
alter table public.user_messages
  drop constraint if exists user_messages_payload_check;

alter table public.user_messages
  add constraint user_messages_payload_check check (
    (message_type = 'text' and char_length(trim(body)) between 1 and 5000
      and media_path is null and media_duration_seconds is null and media_mime_type is null)
    or
    (message_type = 'voice' and char_length(trim(body)) = 0 and media_path is not null
      and media_duration_seconds between 1 and 180
      and media_mime_type in ('audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/wav','audio/3gpp'))
    or
    (message_type = 'image' and char_length(trim(body)) between 0 and 2000 and media_path is not null
      and media_duration_seconds is null and media_mime_type in ('image/jpeg','image/png','image/webp','image/gif'))
    or
    (message_type = 'file' and char_length(trim(body)) between 0 and 2000 and media_path is not null
      and media_duration_seconds is null and media_mime_type in (
        'application/pdf','text/plain','application/zip','application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'))
  );

update storage.buckets
set file_size_limit=20971520,
    allowed_mime_types=array[
      'audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/wav','audio/3gpp',
      'image/jpeg','image/png','image/webp','image/gif',
      'application/pdf','text/plain','application/zip','application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]
where id='pluits-message-media';
