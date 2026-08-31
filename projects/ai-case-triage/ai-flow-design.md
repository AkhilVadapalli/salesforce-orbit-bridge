# AI Case Triage Flow Design

## Objective

Create an automated support workflow that uses case data and AI-generated recommendations to improve triage quality and reduce manual workload.

## Flow overview

1. Case created or updated.
2. Entry criteria checks for support-case workflows.
3. Apex service gathers case details, history, and metadata.
4. AI recommendation is requested and returned.
5. Case fields are updated with recommended priority and category.
6. Assignment rules or queue routing are triggered.
7. Alerts are sent when high-risk or severe cases are identified.
8. Agent reviews recommendation and final action is logged.

## Triggering events

- new case created
- case priority changed
- case status changed to working
- customer sentiment signal or SLA risk is detected

## Decision points

- Is the case severity above threshold?
- Does the issue require escalation?
- Is the customer in a risk category?
- Does the case match a known issue template?

## Recommended automation steps

### Flow A: Case intake triage

- Entry: when case is created or changed
- Conditions:
  - priority is not blank OR status is new
  - record type indicates support case
- Actions:
  - call Apex service
  - update priority and category suggestions
  - assign queue based on routing rules

### Flow B: High-risk escalation

- Entry: when AI priority recommendation is High or Critical
- Actions:
  - notify support manager
  - create escalation task
  - set flagged indicator on case

### Flow C: Agent review checkpoint

- Entry: when recommendation is generated
- Actions:
  - show triage summary in LWC panel
  - require human validation before final resolution

## Why this flow matters

It shows how Salesforce business process automation can be productized and business-critical rather than simple record updates alone.
