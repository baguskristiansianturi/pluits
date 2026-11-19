# PLUITS Payments — Payment Methods & Transaction Trust

Status: **PROPOSED — discovery baseline only; no payment gateway selected or integrated.**

Owner: Shared Platform Services. This document describes the planned cross-platform payment capability and the customer/merchant-facing principles. Marketplace checkout and merchant operations consume this shared capability; they do not define separate competing payment standards.

## 1. Purpose

PLUITS intends to make it easier for businesses to receive payments and for customers to pay through familiar channels. The initial direction is to work with an established third-party payment gateway operating in Indonesia.

A payment gateway is a payment-processing intermediary. It can route payment instructions to supported channels and return transaction results. It is **not automatically an escrow service, a guarantee of delivery, or a guarantee that every dispute/refund will be approved**.

PLUITS must not claim to hold, safeguard, split, or release merchant funds until the selected provider, contractual model, legal requirements, settlement flow, and reconciliation design explicitly support those capabilities.

## 2. Candidate payment method families for Indonesia

The categories below are a market-discovery baseline drawn from the published payment-channel catalogues of multiple Indonesian gateway providers. They are not a promise that every channel will be enabled in PLUITS.

| Category | Examples found in provider catalogues | Customer value |
|---|---|---|
| QR payments | QRIS | Pay from participating bank and e-wallet apps using one national QR standard |
| Bank transfer / Virtual Account | BCA, BNI, BRI, Mandiri, BSI, Permata, CIMB, BTN and other supported banks | Familiar bank transfer with a transaction-specific payment reference |
| E-wallet | GoPay, OVO, DANA, ShopeePay, LinkAja | Pay from a digital wallet customers already use |
| Debit and credit cards | Visa, Mastercard, JCB, American Express; domestic card networks where supported | Convenient card payments, including eligible international cards |
| Retail cash payment | Alfamart, Indomaret and other supported retail outlets | An option for customers who prefer to pay in cash at a store |
| PayLater / instalments | Kredivo, Akulaku, Indodana, Atome and other provider-dependent options | Flexible payment choices subject to customer eligibility and provider approval |
| Direct debit / digital banking | Bank-specific direct debit and mobile/internet banking channels | Pay from an eligible bank account or banking service |

Provider catalogues consulted:
- [Midtrans — payment methods in Indonesia](https://docs.midtrans.com/docs/apa-saja-metode-pembayaran-yang-disediakan-oleh-midtrans)
- [Xendit — products and services available in Indonesia](https://help.xendit.co/hc/id/articles/360034705952-Produk-dan-layanan-apakah-yang-Xendit-sediakan)
- [DOKU — payment methods](https://docs.doku.com/accept-payments/payment-methods)

The provider lists differ. Some methods require business verification, underwriting, a specific legal entity, country, currency, transaction amount, or separate activation. PLUITS must confirm availability directly with the selected provider before displaying a method as active.

## 3. Public homepage communication

The public homepage may describe the planned breadth of payment choices, but must distinguish the roadmap from a live capability.

Recommended customer-facing message:

> **Berikan pelanggan lebih banyak cara untuk membayar.**  
> Mulai dari QRIS hingga kartu dan dompet digital, pilihan pembayaran dirancang agar pelanggan dapat memilih cara yang paling nyaman.

Recommended trust message:

> **Pembayaran melalui mitra tepercaya. Lebih jelas bagi kedua pihak.**  
> PLUITS merencanakan penggunaan payment gateway pihak ketiga untuk menjadi perantara pembayaran antara pelanggan dan bisnis. Mitra pembayaran membantu memproses transaksi dan mengirimkan konfirmasi, sementara PLUITS membantu pelanggan dan pemilik usaha mengikuti status pesanan dengan lebih jelas.

Required availability note:

> Pilihan dan ketersediaan metode mengikuti mitra pembayaran, jenis usaha, serta proses aktivasi. Fitur pembayaran ini belum aktif dan belum terhubung ke penyedia pembayaran.

Do not use terms such as “100% aman”, “bebas risiko”, “dana dijamin”, “escrow”, “uang ditahan sampai pesanan selesai”, or “refund pasti” unless a verified provider contract and implemented product behavior support the exact claim.

## 4. Trust and responsibility boundaries

- Customer payment credentials should be handled by the selected provider's approved payment flow; do not store raw card credentials in PLUITS.
- PLUITS should create a clear order/payment reference and display a truthful payment status.
- Provider payment notifications must be verified server-to-server; a browser redirect alone is not proof of payment.
- Payment initiation and callbacks must be idempotent to prevent duplicate charges or order transitions.
- Customer and merchant should see clear payment amount, channel, expiry where applicable, fees where applicable, and current status.
- Refund, cancellation, chargeback, dispute, and settlement rules must be visible and must match the provider contract.
- Merchant settlement timing, fees, reserves, payout eligibility, and payout destination must not be promised before provider confirmation.
- Do not assume marketplace split payments or multi-seller settlement are supported. This remains an explicit open design decision in Marketplace flows.
- PayLater is an optional third-party credit product; eligibility, approval, terms, and repayment obligations belong to the provider and customer.

## 5. Open decisions before integration

1. Select and contract a provider after capability, fee, legal, settlement, support, and risk comparison.
2. Confirm whether PLUITS contracts as platform, marketplace, facilitator, or individual merchant aggregator; obtain legal/compliance advice.
3. Confirm supported business categories, countries, currencies, payment channels, and merchant onboarding requirements.
4. Decide whether payment is direct-to-merchant, platform collection, or provider-supported split settlement.
5. Define transaction lifecycle, payment expiry, partial payment, refund, cancellation, dispute and chargeback behavior.
6. Define merchant settlement and reconciliation, including fees, taxes, reserves and failed payouts.
7. Complete security review, webhook signature verification, idempotency, audit trails, privacy and operational monitoring.
8. Test provider sandbox and production readiness before enabling any method in the UI.

## 6. Status and implementation boundary

- This is a discovery and product-design baseline only.
- No provider has been selected or connected by this document.
- No payment method shown on the public homepage is currently available to customers through PLUITS.
- Existing marketplace payment records and backend contracts must be audited before implementation; do not modify production migrations or financial records as part of this discovery task.
