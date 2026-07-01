# ChickBazaar ERP Documentation

This directory is the living source of truth for the ChickBazaar platform.

## Document Index

- `VISION.md`: product vision, operating model, users, and boundaries.
- `PRD.md`: current product requirements and V1 commercial scope.
- `ARCHITECTURE.md`: target system architecture and application boundaries.
- `BUSINESS_RULES.md`: mandatory operational and data-separation rules.
- `DATABASE.md`: PostgreSQL domain model, ownership, indexes, and RLS approach.
- `API_SPEC.md`: API conventions and initial endpoint catalogue.
- `AUTOMATION_WORKFLOWS.md`: event-driven operational workflows.
- `DECISION_LOG.md`: accepted architectural decisions and their reasoning.
- `ROADMAP.md`: releases, sprints, entry criteria, and completion criteria.
- `LAUNCH_CHECKLIST.md`: pilot launch tasks and operational checks.
- `CURRENT_STATE.md`: honest inventory of what exists in the repository today.

## Governance

1. Code must not contradict `BUSINESS_RULES.md`.
2. Architectural changes require a `DECISION_LOG.md` entry.
3. Every module specification must define roles, states, permissions, APIs, data, audit events, failure paths, and acceptance tests.
4. Documentation and code must be updated in the same change.
5. Features are not marked complete until authorization and data-isolation tests pass.

## Delivery Method

Work module by module. Each implementation prompt must reference these documents and explicitly extend the existing codebase rather than replacing it.
