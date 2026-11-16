# 01 — DESIGN

## Product definition
Restaurant & Café is a PLUITS business module connecting customers with restaurants and giving restaurant operators tools to manage reservations, dine-in visits, online orders, kitchen production, service, payment and operational oversight.

It is not a separate standalone business outside PLUITS. It is a future module for the existing platform.

## Product surfaces
1. Customer application (eventually surfaced inside PLUITS).
2. Restaurant management console.
3. Staff and service operations application.
4. Kitchen / barista display.
5. Cashier / POS application.

All surfaces share authenticated platform identity where integration contracts permit, but each has role-scoped routes and permissions.

## Core customer journey
Discover restaurant → view profile/menu → reserve or walk in → check in and verify table → create one or more orders → follow preparation/service → request assistance or manager → review bill and pay → receive receipt → review, reorder or contact support.

## Core operating journey
Restaurant setup → branch and hours configuration → seating and reservation policy → menu and pricing setup → staff/roles/shifts → daily opening → live operations → kitchen and service execution → cashier/payment/reconciliation → daily closing and reporting.

## Visit and order distinction
A Visit is the dining session, usually associated with a table. Multiple independent orders may belong to one Visit. Each order has its own Order ID. Visit lifecycle is not identical to payment lifecycle: partial payment or additional orders must not silently close a still-active visit.

## LIVE-only customer calls
Two separate actions exist while a Visit is LIVE:
- Panggilan Bantuan: ordinary waiter/service assistance.
- Call Manager: management escalation for complaints, disputes or serious service concerns.

LIVE means the customer has checked in, presence/table has been verified, and the Visit has not been closed. The backend must reject call creation outside LIVE. Once the visit is closed or final transaction completed, customers use history, review or support instead.

## Business and operational principles
- Owner visibility is about service quality, escalations, accountability and operational evidence—not merely CCTV.
- Owner, branch manager, staff, kitchen and cashier have distinct permissions.
- Staff assignment and table handover preserve history and attribution.
- Reservation policy may vary by date and time. Existing confirmed reservations retain the policy snapshot under which they were confirmed.
- Kitchen production is station-aware and can run in parallel; it is not forced into a single FIFO queue.
- Online and dine-in use a shared order engine with different fulfillment policies.
- Menu, stock, promotions, billing, payments and settlement are separate concerns.

## Page inventory (initial baseline)
Customer: CUS-01 Discovery; CUS-02 Search & Explore; CUS-03 Restaurant Profile; CUS-04 Menu Catalog; CUS-05 Item Detail; CUS-06 Reservation; CUS-07 Reservation Status; CUS-08 Visit Check-in; CUS-09 Table Verification; CUS-10 Group Visit; CUS-11 Cart; CUS-12 Order Confirmation; CUS-13 Order Tracking; CUS-14 Panggilan Bantuan; CUS-15 Call Manager; CUS-16 Billing & Payment; CUS-17 Payment Result; CUS-18 Transaction Detail/Receipt; CUS-19 Review & Rating; CUS-20 Order History; CUS-21 Favorites; CUS-22 Complaint & Support.

Management: Dashboard; Live Operations; Table Management; Reservation Management; Order Management; Service Requests & Escalations; Daily Opening/Closing; Business Profile; Branch Management; Operating Hours; Service Configuration; Reservation Policy; Seating Configuration; Restaurant Readiness; Menu, Category, Item, Variant, Modifier, Availability and Promotion management; Staff Directory/Profile/Scheduling/Attendance/Verification/Shift/Assignment/Handover/Performance; Device Management; Roles & Permissions; Kitchen & Station Configuration; optional Basic Stock; Cashier/Terminal Management; Payment and Billing/Fiscal Configuration; Transactions; Refund/Void; Cash Reconciliation; Sales and branch/product reports; Audit Trail; Reviews; Settings.

Staff: Login; Dashboard; My Shift; My Attendance; Table Overview/Detail; Guest Requests; Task Claim/Assignment; Order Assistance; Serving Management; Table Handover; Service History; Notifications; Profile.

Kitchen: Login; Station Selection; Live Display; Ticket Detail; Production Queue; Ready Orders; Completed Orders; Station Settings.

Cashier/POS: Login; Terminal Selection; Dashboard; POS Order View; Billing Detail; Payment Processing/Verification; Split Bill; Refund Management; Cash Shift Opening/Closing; Cash Reconciliation; Receipt Management; Transaction Search.

This inventory is a baseline, not a claim that all screens are fully specified. Each page and form must be expanded into acceptance criteria before implementation.
