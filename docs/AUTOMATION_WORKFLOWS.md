# Automation Workflows

## Order Lifecycle

```text
Draft/Submitted
  -> Validated
  -> Payment or Credit Check
  -> Accepted
  -> Waiting for Cutoff
  -> Locked for Procurement
  -> Allocation Pending
  -> Allocated
  -> Procurement Started
  -> Birds Procured
  -> Driver Assigned
  -> Out for Delivery
  -> Delivered
  -> Invoice Generated
  -> Completed
```

Every transition produces an immutable event, notification candidates, and audit metadata.

## Nightly Order Lock

1. Scheduler determines the city and operational date.
2. Job acquires an idempotent lock.
3. Eligible accepted orders are validated.
4. Orders transition atomically to `locked_for_procurement`.
5. Demand aggregates are refreshed.
6. Allocation run is requested.
7. Validation failures enter the exception queue.

## Repeat-Order Expansion

1. Find active recurrence rules within the planning horizon.
2. Resolve timezone, holidays, pauses, and contract constraints.
3. Generate missing order occurrences using a unique recurrence key.
4. Feed occurrences into the demand calendar.
5. Notify retailers of upcoming commitments where policy requires.

## Allocation Run

1. Snapshot locked demand and eligible inventory.
2. Load farm, vehicle, driver, route, rating, cost, and capacity constraints.
3. Reject infeasible candidates.
4. Score feasible candidates using a versioned scoring configuration.
5. Select allocations under inventory and logistics constraints.
6. Reserve inventory in the same transaction as confirmed allocations.
7. Create exceptions for shortages or impossible routes.
8. Publish procurement planning events.

## Procurement and Dispatch

1. Group allocations into farm procurement orders.
2. Build pickup schedules and loading sheets.
3. Assign vehicles and drivers.
4. Optimize pickup and delivery sequences.
5. Track acceptance, arrival, loading, actual weight, and departure.
6. Replan only affected trips when an exception occurs.

## Delivery Completion

1. Driver records actual weight and POD.
2. System validates required operational evidence.
3. Delivery transitions to delivered.
4. Invoice is generated from billable weight and tax rules.
5. Retailer ledger, farm payable, and margin entries are posted.
6. Notifications and analytics projections update.

## Exception Center

Exception types include inventory shortage, farm rejection, absent driver, vehicle breakdown, delayed pickup, late delivery, payment failure, weight variance, missing POD, and notification failure.

Each exception has severity, owner, SLA, status, evidence, resolution, and audit history.

## Notification Engine

Business events create notification intents. Channel workers deliver SMS, WhatsApp, email, in-app, or push messages. Delivery failures retry with limits and then create exceptions.
