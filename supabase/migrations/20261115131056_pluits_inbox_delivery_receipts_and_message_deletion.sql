create table if not exists public.user_message_receipts (
  message_id uuid not null references public.user_messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  delivered_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (message_id,user_id)
);
create index if not exists user_message_receipts_user_unread_idx
  on public.user_message_receipts(user_id,read_at) where read_at is null;
alter table public.user_message_receipts enable row level security;
drop policy if exists message_receipts_participant_read on public.user_message_receipts;
create policy message_receipts_participant_read
on public.user_message_receipts for select to authenticated
using (
  user_id=(select auth.uid())
  or exists (
    select 1 from public.user_messages m
    where m.id=user_message_receipts.message_id
      and m.sender_id=(select auth.uid())
      and private.is_conversation_member(m.conversation_id,(select auth.uid()))
  )
);
revoke all on public.user_message_receipts from anon, public;
grant select on public.user_message_receipts to authenticated;

create table if not exists public.user_message_hidden (
  message_id uuid not null references public.user_messages(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  hidden_at timestamptz not null default now(),
  primary key (message_id,user_id)
);
alter table public.user_message_hidden enable row level security;
drop policy if exists message_hidden_owner_read on public.user_message_hidden;
create policy message_hidden_owner_read
on public.user_message_hidden for select to authenticated
using (user_id=(select auth.uid()));
revoke all on public.user_message_hidden from anon, public;
grant select on public.user_message_hidden to authenticated;

create or replace function private.create_message_delivery_receipts()
returns trigger language plpgsql security definer set search_path=''
as $function$
begin
  insert into public.user_message_receipts(message_id,user_id)
  select new.id,m.user_id
  from public.user_conversation_members m
  where m.conversation_id=new.conversation_id and m.user_id<>new.sender_id
  on conflict(message_id,user_id) do nothing;
  return new;
end;
$function$;
revoke all on function private.create_message_delivery_receipts() from public,anon,authenticated;
drop trigger if exists create_message_delivery_receipts on public.user_messages;
create trigger create_message_delivery_receipts after insert on public.user_messages
for each row execute function private.create_message_delivery_receipts();

insert into public.user_message_receipts(message_id,user_id)
select msg.id,m.user_id
from public.user_messages msg
join public.user_conversation_members m on m.conversation_id=msg.conversation_id and m.user_id<>msg.sender_id
on conflict(message_id,user_id) do nothing;

create or replace function public.mark_conversation_delivered(p_conversation_id uuid)
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
revoke all on function public.mark_conversation_delivered(uuid) from public,anon;
grant execute on function public.mark_conversation_delivered(uuid) to authenticated;

create or replace function public.mark_conversation_read(p_conversation_id uuid)
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
revoke all on function public.mark_conversation_read(uuid) from public,anon;
grant execute on function public.mark_conversation_read(uuid) to authenticated;

create or replace function public.hide_message_for_me(p_message_id uuid)
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
revoke all on function public.hide_message_for_me(uuid) from public,anon;
grant execute on function public.hide_message_for_me(uuid) to authenticated;

create or replace function public.delete_message_for_everyone(p_message_id uuid)
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
revoke all on function public.delete_message_for_everyone(uuid) from public,anon;
grant execute on function public.delete_message_for_everyone(uuid) to authenticated;

do $$
begin
  if exists(select 1 from pg_publication where pubname='supabase_realtime') then
    if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='user_message_receipts') then
      alter publication supabase_realtime add table public.user_message_receipts;
    end if;
    if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='user_message_hidden') then
      alter publication supabase_realtime add table public.user_message_hidden;
    end if;
  end if;
end $$;
