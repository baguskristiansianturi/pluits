alter table public.user_message_receipts
add column if not exists played_at timestamptz;

create or replace function private.mark_message_played(p_message_id uuid)
returns void language plpgsql security definer set search_path=''
as $function$
declare v_user uuid:=auth.uid(); v_conversation uuid;
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  select conversation_id into v_conversation
  from public.user_messages
  where id=p_message_id and message_type='voice' and sender_id<>v_user;
  if v_conversation is null or not private.is_conversation_member(v_conversation,v_user) then
    raise exception 'Voice message not found';
  end if;
  update public.user_message_receipts
  set delivered_at=coalesce(delivered_at,now()),read_at=coalesce(read_at,now()),played_at=coalesce(played_at,now())
  where message_id=p_message_id and user_id=v_user;
  if not found then raise exception 'Voice receipt not found'; end if;
end;
$function$;
revoke all on function private.mark_message_played(uuid) from public,anon;
grant execute on function private.mark_message_played(uuid) to authenticated;

create or replace function public.mark_message_played(p_message_id uuid)
returns void language sql security invoker set search_path=''
as $function$ select private.mark_message_played(p_message_id); $function$;
revoke all on function public.mark_message_played(uuid) from public,anon;
grant execute on function public.mark_message_played(uuid) to authenticated;
