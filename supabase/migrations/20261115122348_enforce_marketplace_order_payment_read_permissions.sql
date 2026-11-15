begin;

-- Store membership alone must never grant access to buyer contact details or payment metadata.
-- Owners/managers and explicitly authorized order/payment operators retain least-privilege access.
drop policy if exists marketplace_orders_participant_read on public.marketplace_orders;
create policy marketplace_orders_participant_read
on public.marketplace_orders
for select
to authenticated
using (
  buyer_user_id = (select auth.uid())
  or (select private.has_store_permission(store_id, 'orders.manage'))
  or (select private.has_store_permission(store_id, 'payments.manage'))
);

drop policy if exists marketplace_payments_participant_read on public.marketplace_payment_records;
create policy marketplace_payments_participant_read
on public.marketplace_payment_records
for select
to authenticated
using (
  buyer_user_id = (select auth.uid())
  or exists (
    select 1
    from public.marketplace_orders o
    where o.id = marketplace_payment_records.order_id
      and (select private.has_store_permission(o.store_id, 'payments.manage'))
  )
);

commit;
