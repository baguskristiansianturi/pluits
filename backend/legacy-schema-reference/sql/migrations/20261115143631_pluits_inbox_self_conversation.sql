-- Allow a user to open a private conversation with their own PLUITS account.
-- Self-chat uses a stable key and exactly one conversation member.
create or replace function public.start_direct_conversation(p_other_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $function$
declare
  v_me uuid := auth.uid();
  v_id uuid;
  v_key text;
  v_visibility text;
begin
  if v_me is null then
    raise exception 'Sign in required';
  end if;

  if p_other_user_id is null then
    raise exception 'Choose an account';
  end if;

  if p_other_user_id = v_me then
    v_key := 'self:' || v_me::text;

    insert into public.user_conversations(conversation_type, direct_key, created_by)
    values ('direct', v_key, v_me)
    on conflict (direct_key) do update set updated_at = now()
    returning id into v_id;

    insert into public.user_conversation_members(conversation_id, user_id, role)
    values (v_id, v_me, 'member')
    on conflict (conversation_id, user_id) do nothing;

    return v_id;
  end if;

  select visibility into v_visibility
  from public.user_profiles
  where id = p_other_user_id;

  if not found then
    raise exception 'Account not found';
  end if;

  if exists (
    select 1 from public.user_blocks
    where (blocker_id = v_me and blocked_id = p_other_user_id)
       or (blocker_id = p_other_user_id and blocked_id = v_me)
  ) then
    raise exception 'Messaging is unavailable for this account';
  end if;

  if v_visibility = 'private'
     and not exists (
       select 1 from public.user_follows
       where follower_id = v_me
         and following_id = p_other_user_id
         and status = 'accepted'
     ) then
    raise exception 'Follow request must be accepted before messaging this private account';
  end if;

  v_key := least(v_me::text, p_other_user_id::text) || ':' ||
           greatest(v_me::text, p_other_user_id::text);

  insert into public.user_conversations(conversation_type, direct_key, created_by)
  values ('direct', v_key, v_me)
  on conflict (direct_key) do update set updated_at = now()
  returning id into v_id;

  insert into public.user_conversation_members(conversation_id, user_id, role)
  values (v_id, v_me, 'member'), (v_id, p_other_user_id, 'member')
  on conflict (conversation_id, user_id) do nothing;

  return v_id;
end
$function$;

revoke all on function public.start_direct_conversation(uuid) from public, anon;
grant execute on function public.start_direct_conversation(uuid) to authenticated;
