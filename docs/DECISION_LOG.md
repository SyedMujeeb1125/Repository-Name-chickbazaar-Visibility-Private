# Architecture Decision Log

## ADR-001: ChickBazaar Is the Counterparty

- Status: Accepted
- Decision: Retailers order from ChickBazaar and never browse or select farms.
- Reason: ChickBazaar owns supply reliability, pricing, privacy, and fulfillment.

## ADR-002: Strict Marketplace-Side Privacy

- Status: Accepted
- Decision: Retailers cannot see farms; farms cannot see retailers; drivers see operational minimums.
- Reason: Protect commercial relationships and prevent marketplace bypass.

## ADR-003: Automation by Default

- Status: Accepted
- Decision: Locking, demand planning, allocation, reservation, procurement, and dispatch are automated. Human changes are exceptions with reasons and audit records.
- Reason: Scale and consistency require deterministic workflows.

## ADR-004: Modular Monolith First

- Status: Accepted
- Decision: Use clear domain modules in a shared platform before extracting services.
- Reason: The team can deliver faster without losing future scalability.

## ADR-005: PostgreSQL Is the Transactional Source of Truth

- Status: Accepted
- Decision: Replace local JSON storage with normalized PostgreSQL before public production launch.
- Reason: Transactions, constraints, concurrency, auditability, and durable storage are mandatory.

## ADR-006: Supabase for Initial Platform Services

- Status: Accepted
- Decision: Use Supabase Auth, PostgreSQL, Storage, and RLS for the first production platform.
- Reason: It provides required infrastructure with low operational overhead.

## ADR-007: Orders Lock at 11:59 PM

- Status: Accepted, configurable by city
- Decision: Retailer modifications close at 11:59 PM local operational time.
- Reason: Procurement and logistics need a deterministic planning boundary.

## ADR-008: Recurrence Produces Explicit Order Instances

- Status: Accepted
- Decision: Repeat rules generate dated orders rather than being interpreted only at fulfillment time.
- Reason: Future demand, procurement, billing, cancellation, and audit need explicit instances.

## ADR-009: Financial Entries Are Append-Only

- Status: Accepted
- Decision: Posted invoices, payments, and ledger entries are corrected through reversals or adjustments.
- Reason: Financial auditability must survive corrections.

## ADR-010: Current Local Backend Is Transitional

- Status: Accepted
- Decision: Local JSON and filesystem storage are allowed for development and demonstrations only.
- Reason: They are not reliable under serverless deployment or concurrent production traffic.

## New Decision Template

```text
## ADR-NNN: Title
- Status: Proposed | Accepted | Superseded
- Context:
- Decision:
- Consequences:
- Supersedes:
```
