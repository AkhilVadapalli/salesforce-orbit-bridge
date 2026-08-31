# Sandbox Test Plan for AI Case Triage Assistant

## Goal

Validate the project in a Salesforce sandbox before any production promotion or AppExchange packaging effort.

## Test stages

### 1. Unit testing

Validate Apex behavior with test classes.

Checklist:

- case with valid ID returns suggestions
- null case ID returns empty list
- case subject containing login routes to Technical Support
- case with phone origin routes to Priority Support
- default route works for general cases

### 2. Lightning component validation

Test the LWC panel behavior.

Checklist:

- component loads for a valid case record
- suggestions render correctly
- empty state appears when no records are available
- priority badge reflects the case priority
- queue information displays properly

### 3. Flow and automation validation

Validate routing and escalation logic.

Checklist:

- new case triggers triage logic
- queue assignment is updated as expected
- escalation rule fires for high-risk cases
- notifications are delivered to target users or queues
- case history remains auditable

### 4. Security validation

Check that only authorized users can access and act on triage data.

Checklist:

- profiles and permission sets are correctly assigned
- Apex runs with expected sharing model
- agents can review but not override restricted data without permission
- admin-only actions are hidden from standard users

### 5. User acceptance testing

Validate the app from the perspective of real support users.

Checklist:

- case summary is understandable
- action buttons are intuitive
- recommended queue makes sense
- escalation workflow is clear
- support managers can review high-risk items

### 6. Regression testing

Check that no unrelated support behavior is broken.

Checklist:

- standard case creation still works
- case updates still trigger expected automation
- SLA workflows remain unaffected
- queue assignment remains stable

## Exit criteria for promotion

The project should only move to the next stage when:

- unit tests pass
- LWC behavior is confirmed
- flow automation works as expected
- user stories are validated
- security checks pass
- no critical defects remain

## Promotion gate

Do not move to production or AppExchange preparation until all exit criteria are met.
