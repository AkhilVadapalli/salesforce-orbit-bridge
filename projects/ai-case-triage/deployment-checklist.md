# Salesforce Deployment Checklist

## Stage 1: Local project review

- code and metadata are organized
- unit tests exist for key Apex logic
- project docs are up to date
- dependencies are understood

## Stage 2: Sandbox deployment

- deploy to a development sandbox
- validate data model and record access
- confirm Apex compiles
- confirm LWC loads in a case record page
- check Flow activation and automation triggers

## Stage 3: Functional testing

- test positive and negative user flows
- confirm routing logic and escalation behavior
- review agent experience
- review admin experience
- verify notifications and assignments

## Stage 4: Security testing

- validate permission sets
- confirm record visibility and access control
- verify hidden actions are blocked as expected
- review external API access rules

## Stage 5: UAT approval

- collect business user feedback
- resolve functional defects
- confirm business value is evident
- sign off by stakeholder or project owner

## Stage 6: Production promotion

- perform final deployment review
- confirm test evidence
- validate release note readiness
- promote only after approval

## Stage 7: AppExchange preparation

- package metadata and docs
- prepare support plan
- finalize listing narrative
- confirm security review requirements
