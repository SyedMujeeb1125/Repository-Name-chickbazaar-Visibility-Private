# Database Architecture

## Standards

- PostgreSQL UUID primary keys.
- `timestamptz` for event timestamps and `date` for operational dates.
- Monetary values stored in minor currency units or constrained numeric columns.
- Weights stored as constrained numeric kilograms, never display strings.
- Soft deletion only where legally or operationally required.
- `created_at`, `updated_at`, and actor metadata on mutable master records.
- Immutable event/movement tables for operational and financial history.

## Core Domains and Tables

### Identity

- `profiles`
- `organizations`
- `organization_members`
- `roles`
- `user_roles`
- `addresses`
- `cities`
- `zones`

### Retailers

- `retailers`
- `retailer_documents`
- `retailer_credit_accounts`
- `retailer_contacts`

### Farms and Inventory

- `farms`
- `farm_documents`
- `farm_capacity`
- `farm_inventory_snapshots`
- `inventory_movements`
- `inventory_reservations`
- `farm_ratings`

### Orders and Demand

- `orders`
- `order_items`
- `order_status_events`
- `recurring_order_rules`
- `contracts`
- `contract_schedules`
- `demand_calendar`
- `demand_forecasts`

### Allocation and Procurement

- `allocation_runs`
- `allocation_candidates`
- `allocations`
- `allocation_overrides`
- `procurement_orders`
- `procurement_order_items`
- `loading_sheets`

### Logistics

- `drivers`
- `vehicles`
- `vehicle_capacity`
- `trips`
- `trip_stops`
- `delivery_events`
- `proof_of_delivery`
- `weight_records`

### Finance

- `invoices`
- `invoice_lines`
- `payments`
- `payment_events`
- `ledger_accounts`
- `ledger_entries`
- `farm_settlements`
- `expenses`

### Platform

- `notifications`
- `notification_deliveries`
- `support_tickets`
- `exceptions`
- `audit_logs`
- `outbox_events`
- `idempotency_keys`

## Critical Constraints

- Unique order number and invoice number per legal entity.
- Inventory balances cannot become negative.
- One active reservation per allocation and inventory source combination.
- One generated order instance per recurrence rule and occurrence date.
- Debit and credit ledger entries balance per transaction.
- Status transitions are enforced by database functions or guarded service commands.

## Index Strategy

- Orders: retailer, operational date, city, status, and created time.
- Inventory: farm, operational date, weight band, and availability.
- Allocations: run, order, farm, and status.
- Trips: operational date, city, driver, vehicle, and status.
- Ledger: account, posting date, reference type, and reference ID.
- Audit/outbox: aggregate ID, event type, created time, and processing state.

## RLS Model

- Retailer policies filter by retailer organization membership.
- Farm policies filter by farm organization membership.
- Driver policies filter by assignments and active trip windows.
- Admin policies use explicit scoped roles, not a universal client-side bypass.
- Service-role access is server-only and never shipped to browsers.

## Views and RPC Functions

Planned examples:

- `retailer_order_summary`
- `farm_inventory_balance`
- `admin_control_tower_daily`
- `retailer_ledger_balance`
- `lock_orders_for_operational_date()`
- `reserve_inventory()`
- `post_ledger_transaction()`
- `claim_outbox_events()`

Migrations must define tables, constraints, indexes, policies, functions, and rollback considerations together.
