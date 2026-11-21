create table if not exists public.user_message_stars (
  user_id uuid not null references auth.users(id) on delete cascade,
  message_id uuid not null references public.user_messages(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id,message_id)
);
alter table public.user_message_stars enable row level security;
revoke all on public.user_message_stars from anon,public;
grant select,insert,delete on public.user_message_stars to authenticated;
drop policy if exists inbox_message_stars_read on public.user_message_stars;
create policy inbox_message_stars_read on public.user_message_stars for select to authenticated using(user_id=(select auth.uid()));
drop policy if exists inbox_message_stars_insert on public.user_message_stars;
create policy inbox_message_stars_insert on public.user_message_stars for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.user_messages m where m.id=message_id and private.is_conversation_member(m.conversation_id,(select auth.uid()))));
drop policy if exists inbox_message_stars_delete on public.user_message_stars;
create policy inbox_message_stars_delete on public.user_message_stars for delete to authenticated using(user_id=(select auth.uid()));
