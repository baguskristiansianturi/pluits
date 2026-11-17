# Domain Model & State Rules (baseline)

## Core entities
Restaurant, Branch, BusinessHours, ServiceHours, Table, SeatingArea, Reservation, Visit, VisitParticipant, MenuCategory, MenuItem, MenuVariant, ModifierGroup, ModifierOption, Promotion, Cart, Order, OrderItemSnapshot, KitchenTicket, KitchenStation, ServiceTask, StaffMember, AttendanceRecord, AttendanceVerification, Shift, ServiceAssignment, CashierTerminal, CashierShift, Bill, Payment, Refund, Settlement, LedgerEntry, Review, SupportCase, Notification, Device, AuditEvent.

## Lifecycle separation
- Reservation: requested → confirmed → arrived/checked-in → seated/converted to Visit; cancelled/no-show/expired where policy allows.
- Visit: pending check-in → verified/live → closing → closed. Define explicit rules for group participants and table transfer.
- Order: draft/cart → submitted → accepted → in production → ready → served/completed; cancellation only before production starts, with atomic race protection.
- Service task: created → accepted → in progress → resolved; controlled cancel/escalate; preserve state history.
- Payment: initiated → pending/authorized/received/failed/refunded/partially refunded as provider supports.
- Cashier shift: open → active → closing → reconciled/closed.

## Important relationships
A Visit may contain multiple Orders. An Order may create multiple kitchen tickets across stations. A Bill may cover one or more orders according to the chosen billing policy. A Payment may settle all or part of a bill. Do not infer Visit closure from a single Order or Payment status.

## Concurrency and reliability
Use optimistic versioning or equivalent state guards for critical transitions. Use unique idempotency keys. Claim/handover and reservation/table allocation must be atomic. Realtime events are notifications of committed changes; clients recover by fetching current state after reconnect.

## Unresolved specifications
Final ERD, database technology/schema, exact API routes/payloads, state transition authorization, retention policy, and final split-bill/group payment rules remain to be designed and reviewed.
