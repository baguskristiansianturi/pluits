create or replace function private.create_message_delivery_receipts()
returns trigger
language plpgsql
security definer
set search_path=''
as $function$
begin
  insert into public.user_message_receipts(message_id,user_id,delivered_at,read_at)
  select
    new.id,
    member.user_id,
    case when conversation.direct_key='self:'||new.sender_id::text then now() else null end,
    case when conversation.direct_key='self:'||new.sender_id::text then now() else null end
  from public.user_conversation_members member
  join public.user_conversations conversation on conversation.id=member.conversation_id
  where member.conversation_id=new.conversation_id
    and (
      member.user_id<>new.sender_id
      or conversation.direct_key='self:'||new.sender_id::text
    )
  on conflict(message_id,user_id) do update
    set delivered_at=coalesce(public.user_message_receipts.delivered_at,excluded.delivered_at),
        read_at=coalesce(public.user_message_receipts.read_at,excluded.read_at);
  return new;
end;
$function$;

insert into public.user_message_receipts(message_id,user_id,delivered_at,read_at)
select message.id,member.user_id,coalesce(receipt.delivered_at,now()),coalesce(receipt.read_at,now())
from public.user_messages message
join public.user_conversations conversation
  on conversation.id=message.conversation_id
 and conversation.direct_key='self:'||message.sender_id::text
join public.user_conversation_members member
  on member.conversation_id=message.conversation_id
 and member.user_id=message.sender_id
left join public.user_message_receipts receipt
  on receipt.message_id=message.id and receipt.user_id=member.user_id
on conflict(message_id,user_id) do update
set delivered_at=coalesce(public.user_message_receipts.delivered_at,excluded.delivered_at),
    read_at=coalesce(public.user_message_receipts.read_at,excluded.read_at);