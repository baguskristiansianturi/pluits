drop policy if exists "Conversation members read private voice notes" on storage.objects;
create policy "Conversation members read private voice notes"
on storage.objects for select to authenticated
using (
  bucket_id='pluits-message-media'
  and array_length(storage.foldername(name),1)=2
  and split_part(name,'/',1) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  and split_part(name,'/',2) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
  and private.is_conversation_member(split_part(name,'/',1)::uuid,(select auth.uid()))
  and exists (
    select 1 from public.user_messages m
    where m.media_path=name and m.deleted_at is null
      and private.is_conversation_member(m.conversation_id,(select auth.uid()))
  )
);
