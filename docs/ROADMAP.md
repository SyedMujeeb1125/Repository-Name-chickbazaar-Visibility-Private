# Delivery Roadmap

## Immediate Gate: Production Foundation

This gate comes before adding more ERP screens.

- Upgrade Next.js 15 to 16 after dependency compatibility checks.
- Create Supabase development, staging, and production projects.
- Add PostgreSQL migrations and generated TypeScript database types.
- Replace JSON persistence and local uploads.
- Implement Supabase Auth OTP and production SMS delivery.
- Configure Google OAuth.
- Add role/organization membership, RLS, audit logs, rate limits, and error monitoring.
- Add CI for lint, typecheck, tests, migrations, and production build.

Exit criteria: no production workflow depends on local files or default credentials.

## Sprint 1: Retailer Experience

- Retailer dashboard.
- One-time orders with validated lifecycle.
- Professional order tracking timeline.
- Repeat daily/weekly/monthly orders.
- Future bookings and standing contracts.
- Notifications.
- Invoice list and secure PDF download.
- Ledger and outstanding balance.

Exit criteria: retailer data isolation tests pass and generated recurring orders are idempotent.

## Sprint 2: Demand Planning

- Demand calendar.
- Recurrence expansion engine.
- Tomorrow, weekly, monthly, zone, and weight demand.
- Festival calendar and adjustments.
- Procurement, farm, vehicle, and driver requirement projections.

Exit criteria: forecasts are reproducible from versioned inputs and reconcile to explicit demand.

## Sprint 3: Farm Inventory, Allocation, and Procurement

- Farm app onboarding and daily inventory.
- Inventory movements and reservations.
- Versioned allocation scoring.
- Automated allocation runs and shortages.
- Farm procurement orders and loading sheets.
- Admin override workflow with audit.

Exit criteria: concurrency tests prove inventory cannot be over-allocated.

## Sprint 4: Driver, Dispatch, and Delivery

- Driver and vehicle management.
- Trip, pickup, and delivery stop planning.
- Route/navigation integration.
- Actual weight and POD.
- Delivery completion and exception handling.

Exit criteria: drivers cannot access financial or unrelated trip data.

## Sprint 5: Finance

- Razorpay orders, payments, signatures, and webhooks.
- GST invoices and PDF generation.
- Retailer ledger and collections.
- Farm settlements.
- Margin, outstanding, expense, and reconciliation reports.

Exit criteria: double-entry postings balance and webhook replay is idempotent.

## Sprint 6: Control Tower

- Daily operations KPIs.
- Inventory and allocation coverage.
- Driver/vehicle readiness.
- Revenue and margin.
- Alerts and exception queue.
- Operations calendar drill-down.

Exit criteria: every KPI has a documented definition and traceable source query.

## Later Releases

- AI-assisted demand forecasting.
- Dynamic procurement and allocation recommendations.
- Route optimization and live GPS.
- Credit risk, fraud detection, and behavioral analytics.
- Multi-city, franchise, distributor, and international support.

## Definition of Done for Every Module

- Specification and decision references.
- Database migration and RLS.
- API validation and authorization.
- UI states including empty, loading, error, and offline where relevant.
- Audit events and observability.
- Unit, integration, authorization, and critical-path browser tests.
- Operational runbook and rollback plan.
