# API Specification

## Conventions

- Base path: `/api/v1` for the production API.
- JSON by default; multipart only for uploads.
- Strong server-side validation with stable error codes.
- Role and organization authorization on every protected endpoint.
- Idempotency keys required for order creation, payments, and automation commands.
- Cursor pagination for collections.
- Correlation IDs on requests, logs, audit records, and errors.

## Error Shape

```json
{
  "error": {
    "code": "ORDER_LOCKED",
    "message": "This order can no longer be changed.",
    "correlationId": "uuid",
    "fields": []
  }
}
```

## Retailer APIs

- `POST /api/v1/retailers/register`
- `POST /api/v1/auth/otp/request`
- `POST /api/v1/auth/otp/verify`
- `GET /api/v1/retailer/dashboard`
- `POST /api/v1/orders`
- `GET /api/v1/orders`
- `GET /api/v1/orders/:id`
- `PATCH /api/v1/orders/:id`
- `POST /api/v1/recurring-orders`
- `POST /api/v1/future-bookings`
- `POST /api/v1/contracts`
- `GET /api/v1/invoices`
- `GET /api/v1/ledger`
- `POST /api/v1/payments/create`

Retailer responses must use retailer-safe projections that cannot contain farm fields.

## Farm APIs

- `POST /api/v1/farms/register`
- `PUT /api/v1/farm/inventory/:operationalDate`
- `GET /api/v1/farm/procurements`
- `POST /api/v1/farm/procurements/:id/accept`
- `POST /api/v1/farm/procurements/:id/reject`
- `POST /api/v1/farm/procurements/:id/loading-confirmation`
- `GET /api/v1/farm/payments`

Farm responses must use farm-safe projections that cannot contain retailer fields.

## Driver APIs

- `GET /api/v1/driver/today`
- `GET /api/v1/driver/trips/:id`
- `POST /api/v1/driver/stops/:id/arrive`
- `POST /api/v1/driver/stops/:id/weight`
- `POST /api/v1/driver/stops/:id/pod`
- `POST /api/v1/driver/stops/:id/complete`

## Admin APIs

- `GET /api/v1/admin/dashboard`
- `GET /api/v1/admin/control-tower`
- CRUD/read endpoints for retailers, farms, drivers, vehicles, orders, and settings.
- `POST /api/v1/admin/orders/lock`
- `POST /api/v1/admin/allocation-runs`
- `POST /api/v1/admin/allocations/:id/override`
- `POST /api/v1/admin/procurement-runs`
- `POST /api/v1/admin/dispatch-runs`
- `GET /api/v1/admin/exceptions`

## Webhooks

- `POST /api/v1/webhooks/razorpay`
- `POST /api/v1/webhooks/sms`
- `POST /api/v1/webhooks/whatsapp`

Webhook handlers verify signatures, store the raw event, deduplicate by provider event ID, and process asynchronously.

## Existing Transitional Routes

The current repository contains unversioned development routes under `/api`. They are transitional and will be replaced module by module after PostgreSQL is introduced.
