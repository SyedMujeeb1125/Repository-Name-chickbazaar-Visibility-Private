# System Architecture

## Architecture Style

Start as a modular monolith with strict domain boundaries. This avoids premature distributed-system complexity while preserving a path to extract high-volume workers later.

## Applications

```text
apps/public-web       Marketing and public onboarding
apps/retailer-web     Retailer operations
apps/farm-web         Farm partner operations
apps/admin-web        Admin ERP and Control Tower
apps/driver-mobile    Future Expo application
packages/domain       Shared domain types and business policies
packages/ui           Shared design system
packages/database     Migrations, generated types, and data access
packages/validation   Shared request and form schemas
packages/observability Logging, audit, metrics, and tracing
```

The repository currently uses one Next.js application. Splitting into a workspace is planned after the PostgreSQL foundation, without rewriting public pages.

## Platform Services

- Supabase Auth for OTP and identity.
- PostgreSQL for transactional data.
- Supabase Storage for certificates, invoices, and POD.
- Row Level Security as defense in depth.
- Next.js route handlers for role-aware application APIs.
- Scheduled jobs for locking, recurrence expansion, allocation, notifications, and reconciliation.
- Durable job/event infrastructure before high-volume automation is enabled.

## Domain Modules

- Identity and Access
- Organization and Geography
- Retailers and Credit
- Farms and Inventory
- Orders and Recurrence
- Demand Planning
- Allocation and Reservations
- Procurement
- Drivers, Vehicles, and Trips
- Dispatch and Delivery
- Finance and Payments
- Notifications and Support
- Audit, Reports, and Control Tower

## Security Boundaries

- Every request is authenticated and authorized server-side.
- Public identifiers must not reveal sequential database IDs.
- Retailer responses never join or serialize farm identity.
- Farm responses never join or serialize retailer identity.
- Driver responses expose only trip-operational fields.
- Admin access requires a dedicated role and stronger authentication policy.
- Uploaded files use private buckets and signed, expiring URLs.

## Scale Approach

- Partition high-volume event tables by operational date or city when required.
- Use idempotency keys for order, payment, and automation commands.
- Use outbox events so database changes and automation messages remain consistent.
- Keep allocation runs versioned and reproducible.
- Cache read models, never transactional invariants.

## Environments

- Local: Supabase local development or isolated development project.
- Staging: production-like services with synthetic data.
- Production: separate Supabase and Vercel projects with backups and monitoring.
