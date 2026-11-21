create or replace function private.get_unread_conversation_ids()
returns table(conversation_id uuid)
language sql
security definer
set search_path=''
as $function$
  select member.conversation_id
  from public.user_conversation_members member
  where member.user_id=auth.uid()
    and exists (
      select 1
      from public.user_messages message
      where message.conversation_id=member.conversation_id
        and message.sender_id<>auth.uid()
        and message.deleted_at is null
        and (member.last_read_at is null or message.created_at>member.last_read_at)
        and not exists (
          select 1 from public.user_message_hidden hidden
          where hidden.message_id=message.id and hidden.user_id=auth.uid()
        )
    );
$function$;
revoke all on function private.get_unread_conversation_ids() from public,anon;
grant execute on function private.get_unread_conversation_ids() to authenticated;
create or replace function public.get_unread_conversation_ids()
returns table(conversation_id uuid)
language sql
security invoker
set search_path=''
as $function$ select * from private.get_unread_conversation_ids(); $function$;
revoke all on function public.get_unread_conversation_ids() from public,anon;
grant execute on function public.get_unread_conversation_ids() to authenticated;
