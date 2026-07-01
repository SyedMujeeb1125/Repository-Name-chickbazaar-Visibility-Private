# Current State

Status date: 2026-07-01

`PRD.md` and `LAUNCH_CHECKLIST.md` describe planned scope. They must not be read as evidence that a feature has already been implemented.

## Implemented

- Public ChickBazaar website using Next.js 15, React 19, TypeScript, and Tailwind CSS.
- Retailer order form with a server API.
- Retailer registration with GSTIN and GST certificate upload.
- Farm partner application with a server API.
- Development OTP request and verification flow.
- Google OAuth routes awaiting production credentials.
- Cookie-protected admin login and basic admin dashboard.
- Admin visibility for orders, retailer applications, farm applications, and workflow status changes.
- Local JSON storage and local certificate storage for development or a single persistent server.

## Not Yet Production-Ready

- Supabase/PostgreSQL persistence and migrations.
- Supabase Auth, production OTP delivery, and finalized Google OAuth configuration.
- Object storage for GST certificates and POD files.
- Retailer, farm, and driver role-specific applications.
- Payments, invoices, ledgers, procurement, allocation, dispatch, delivery, and notifications.
- Rate limiting, monitoring, backups, alerting, and production audit logging.
- Automated tests and deployment pipeline.

## Important Constraint

The local JSON backend must not be deployed to Vercel as the production data store. Serverless filesystems are ephemeral. Production launch requires PostgreSQL and object storage first.

## Target Stack

- Next.js 16 after a planned compatibility upgrade.
- React 19 and TypeScript.
- Supabase Auth, PostgreSQL, Storage, Row Level Security, and database functions.
- Vercel for web applications.
- Razorpay for payments.
- Google Maps Platform for routing and navigation.
- Expo React Native for future mobile applications.
