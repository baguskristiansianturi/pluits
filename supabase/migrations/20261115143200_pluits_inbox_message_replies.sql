alter table public.user_messages add column if not exists reply_to_id uuid references public.user_messages(id) on delete set null;
create index if not exists user_messages_reply_to_idx on public.user_messages(reply_to_id) where reply_to_id is not null;
