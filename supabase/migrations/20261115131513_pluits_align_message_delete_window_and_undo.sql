create or replace function private.delete_message_for_everyone(p_message_id uuid)
returns text language plpgsql security definer set search_path=''
as $function$
declare v_user uuid:=auth.uid(); v_media_path text;
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  update public.user_messages set deleted_at=now(),body=''
  where id=p_message_id and sender_id=v_user and deleted_at is null
    and created_at >= now()-interval '48 hours'
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

create or replace function private.undo_hide_message_for_me(p_message_id uuid)
returns boolean language plpgsql security definer set search_path=''
as $function$
declare v_user uuid:=auth.uid(); v_conversation uuid; v_count integer;
begin
  if v_user is null then raise exception 'Sign in required'; end if;
  select conversation_id into v_conversation from public.user_messages where id=p_message_id;
  if v_conversation is null or not private.is_conversation_member(v_conversation,v_user) then raise exception 'Message not found'; end if;
  delete from public.user_message_hidden
  where message_id=p_message_id and user_id=v_user
    and hidden_at >= now()-interval '5 seconds';
  get diagnostics v_count=row_count;
  return v_count>0;
end;
$function$;
revoke all on function private.undo_hide_message_for_me(uuid) from public,anon;
grant execute on function private.undo_hide_message_for_me(uuid) to authenticated;
create or replace function public.undo_hide_message_for_me(p_message_id uuid)
returns boolean language sql security invoker set search_path=''
as $function$ select private.undo_hide_message_for_me(p_message_id); $function$;
revoke all on function public.undo_hide_message_for_me(uuid) from public,anon;
grant execute on function public.undo_hide_message_for_me(uuid) to authenticated;
