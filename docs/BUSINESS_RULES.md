# Business Rules

Rules use stable identifiers so code, tests, and decisions can reference them.

## Data Separation

- `PRIV-001`: Retailers must never receive farm name, location, contact, procurement price, allocation score, or ChickBazaar margin.
- `PRIV-002`: Farms must never receive retailer identity, contact, address, selling price, ledger, or margin.
- `PRIV-003`: Drivers receive only assigned pickup, delivery, navigation, weight, collection, and POD data.
- `PRIV-004`: Only authorized admin roles may view cross-party commercial data.
- `PRIV-005`: Exports, notifications, logs, analytics, and error messages follow the same restrictions as screens and APIs.

## Orders

- `ORD-001`: Orders may be modified by retailers until 11:59 PM in the operation's configured local timezone.
- `ORD-002`: At cutoff, eligible orders transition atomically to `locked_for_procurement`.
- `ORD-003`: Retailers cannot modify locked orders; changes require an auditable admin exception.
- `ORD-004`: Supported order types are one-time, daily repeat, weekly repeat, monthly repeat, future booking, standing contract, festival booking, and emergency order.
- `ORD-005`: Recurring definitions generate dated order instances and demand exactly once.
- `ORD-006`: Order lifecycle transitions must be validated; arbitrary status editing is prohibited.

## Inventory and Allocation

- `INV-001`: Inventory quantities track available, reserved, allocated, collected, and remaining values.
- `INV-002`: A transaction must prevent reservation beyond available inventory.
- `INV-003`: Inventory changes require immutable movement records.
- `ALL-001`: Automatic allocation begins only after order lock unless an authorized emergency workflow applies.
- `ALL-002`: Allocation evaluates inventory, distance, zone, weight, cost, farm rating, driver, vehicle, capacity, and delivery time.
- `ALL-003`: Allocation inputs, weights, candidates, scores, result, and overrides are stored for audit.
- `ALL-004`: Manual allocation requires an authorized admin, reason code, and audit entry.

## Delivery

- `DEL-001`: Actual weight is captured by an authorized operational user and retained with source and timestamp.
- `DEL-002`: Delivery completion requires POD unless an approved exception reason is recorded.
- `DEL-003`: Invoice generation uses actual billable weight and applicable taxes/rates.

## Finance

- `FIN-001`: Payment gateway events are accepted only after signature verification.
- `FIN-002`: Invoice, ledger, settlement, and payment postings are immutable.
- `FIN-003`: Corrections use reversal or adjustment entries.
- `FIN-004`: Procurement cost, selling price, tax, fees, and margin are stored as distinct values.

## Operations

- `OPS-001`: Operational dates and cutoffs are city/timezone aware.
- `OPS-002`: Every automated job is idempotent and safe to retry.
- `OPS-003`: Failures create exceptions; they do not silently skip work.
- `OPS-004`: Alerts remain open until acknowledged and resolved with an audit trail.
