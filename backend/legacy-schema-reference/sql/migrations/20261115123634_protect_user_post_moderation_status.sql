begin;

create or replace function private.guard_user_post_moderation_status()
returns trigger
language plpgsql
set search_path = ''
as $function$
declare
  v_app_role text := coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '');
  v_request_role text := coalesce(auth.role(), '');
begin
  -- Moderator/service-role actions are allowed to apply or reverse moderation decisions.
  if v_app_role in ('admin', 'moderator') or v_request_role = 'service_role' then
    return new;
  end if;

  -- Preserve the current product behavior: normal user posts publish on creation.
  -- A client cannot choose an internal moderation state during insert.
  if tg_op = 'INSERT' then
    new.moderation_status := 'published';
    return new;
  end if;

  -- Owners may edit their content, but may not reverse a moderation action.
  if new.moderation_status is distinct from old.moderation_status then
    raise exception using
      errcode = '42501',
      message = 'Only a Pluits moderator can change post moderation status';
  end if;

  return new;
end;
$function$;

drop trigger if exists user_posts_guard_moderation_status on public.user_posts;
create trigger user_posts_guard_moderation_status
before insert or update of moderation_status on public.user_posts
for each row execute function private.guard_user_post_moderation_status();

comment on function private.guard_user_post_moderation_status() is
  'Prevents content owners from changing moderation_status after creation; only app_metadata admin/moderator or service_role may change moderation decisions.';

commit;
