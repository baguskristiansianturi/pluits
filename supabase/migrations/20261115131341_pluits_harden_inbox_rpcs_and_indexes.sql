create index if not exists user_message_hidden_user_id_idx
on public.user_message_hidden(user_id);

create or replace function private.mark_conversation_delivered(p_conversation_id uuid)
returns void language plpgsql security definer set search_path=''
as $function$
declare v_user uuid:=auth.uid();
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  if not private.is_conversation_member(p_conversation_id,v_user) then raise exception 'Conversation not found'; end if;
  update public.user_message_receipts r
  set delivered_at=coalesce(r.delivered_at,now())
  from public.user_messages m
  where r.message_id=m.id and m.conversation_id=p_conversation_id
    and m.sender_id<>v_user and r.user_id=v_user and r.delivered_at is null;
end;
$function$;
revoke all on function private.mark_conversation_delivered(uuid) from public,anon;
grant execute on function private.mark_conversation_delivered(uuid) to authenticated;
create or replace function public.mark_conversation_delivered(p_conversation_id uuid)
returns void language sql security invoker set search_path=''
as $function$ select private.mark_conversation_delivered(p_conversation_id); $function$;
revoke all on function public.mark_conversation_delivered(uuid) from public,anon;
grant execute on function public.mark_conversation_delivered(uuid) to authenticated;

create or replace function private.mark_conversation_read(p_conversation_id uuid)
returns void language plpgsql security definer set search_path=''
as $function$
declare v_user uuid:=auth.uid();
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  update public.user_conversation_members set last_read_at=now()
  where conversation_id=p_conversation_id and user_id=v_user;
  if not found then raise exception 'Conversation not found'; end if;
  update public.user_message_receipts r
  set delivered_at=coalesce(r.delivered_at,now()),read_at=coalesce(r.read_at,now())
  from public.user_messages m
  where r.message_id=m.id and m.conversation_id=p_conversation_id
    and m.sender_id<>v_user and r.user_id=v_user and r.read_at is null;
end;
$function$;
revoke all on function private.mark_conversation_read(uuid) from public,anon;
grant execute on function private.mark_conversation_read(uuid) to authenticated;
create or replace function public.mark_conversation_read(p_conversation_id uuid)
returns void language sql security invoker set search_path=''
as $function$ select private.mark_conversation_read(p_conversation_id); $function$;
revoke all on function public.mark_conversation_read(uuid) from public,anon;
grant execute on function public.mark_conversation_read(uuid) to authenticated;

create or replace function private.hide_message_for_me(p_message_id uuid)
returns void language plpgsql security definer set search_path=''
as $function$
declare v_user uuid:=auth.uid(); v_conversation uuid;
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  select conversation_id into v_conversation from public.user_messages where id=p_message_id;
  if v_conversation is null or not private.is_conversation_member(v_conversation,v_user) then raise exception 'Message not found'; end if;
  insert into public.user_message_hidden(message_id,user_id)
  values(p_message_id,v_user) on conflict(message_id,user_id) do nothing;
end;
$function$;
revoke all on function private.hide_message_for_me(uuid) from public,anon;
grant execute on function private.hide_message_for_me(uuid) to authenticated;
create or replace function public.hide_message_for_me(p_message_id uuid)
returns void language sql security invoker set search_path=''
as $function$ select private.hide_message_for_me(p_message_id); $function$;
revoke all on function public.hide_message_for_me(uuid) from public,anon;
grant execute on function public.hide_message_for_me(uuid) to authenticated;

create or replace function private.delete_message_for_everyone(p_message_id uuid)
returns text language plpgsql security definer set search_path=''
as $function$
declare v_user uuid:=auth.uid(); v_media_path text;
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  update public.user_messages set deleted_at=now(),body=''
  where id=p_message_id and sender_id=v_user and deleted_at is null
    and created_at >= now()-interval '60 hours'
  returning media_path into v_media_path;
  if not found then raise exception 'Message cannot be deleted for everyone'; end if;
  return v_media_path;
end;
$function$;
revoke all on function private.delete_message_for_everyone(uuid) from public,anon;
grant execute on function private.delete_message_for_everyone(uuid) to authenticated;
create or replace function public.delete_message_for_everyone(p_message_id uuid)
returns text language sql security invoker set search_path=''
as $function$ select private.delete_message_for_everyone(p_message_id); $function$;
revoke all on function public.delete_message_for_everyone(uuid) from public,anon;
grant execute on function public.delete_message_for_everyone(uuid) to authenticated;
