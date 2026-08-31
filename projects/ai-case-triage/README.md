# AI Case Triage Assistant

## Project overview

This project is the first flagship portfolio application in the repository. It demonstrates how Salesforce can be used to build a real operational workflow that blends process automation, AI decision support, and business-friendly user experience.

## Problem statement

Support teams often lose time reading long case histories, deciding priority, and deciding where to route an issue. When teams are overloaded, response quality drops and important issues are missed.

## Business value

This solution reduces turnaround time by:

- summarizing case history instantly
- flagging urgency and impact
- suggesting the right support queue
- drafting initial response direction
- highlighting risk for escalations

## User experience

The target experience is a case workspace panel that makes the agent faster and more confident.

- clear summary of the case situation
- recommended priority level
- suggested response direction
- queue routing recommendation
- escalation option for high-risk scenarios

## Solution architecture

The solution combines several layers:

- Salesforce Case as the system of record
- Apex service for orchestration and business logic
- Flow for routing and notifications
- Lightning Web Component for the triage experience
- AI service for summarization and recommendations

## Functional requirements

- summarize recent customer and case activity
- classify urgency or risk
- recommend support routing
- draft a contextual response suggestion
- log recommendation history for human review
- trigger escalation for business-critical issues

## Non-functional requirements

- secure Salesforce-native access control
- maintain auditable recommendation history
- support future AI provider swaps without redesign
- keep actions reviewable by the human agent
- work well under growing volume

## Expected workflow

1. A new or updated case enters the support flow.
2. Apex gathers the relevant case data and context.
3. AI service evaluates urgency and summarizes the situation.
4. Flow routes the case to the best queue or team.
5. Agent reviews the recommendation and takes action quickly.
6. Manager receives alerts for severe or high-risk cases.

## Current implementation status

The repo currently includes:

- a Salesforce-ready Apex service
- a unit test for the service behavior
- a Lightning Web Component skeleton for a triage panel
- architecture and requirement documentation

## Portfolio significance

This project matters because it models a real business workflow that will continue to be valuable as AI becomes more embedded in enterprise CRM tooling.

## Next development steps

- add Flow-based routing automation
- refine LWC UX for real agent use
- add AI API integration for case summarization
- introduce recommendation logging and review workflow
- document business metrics and demo outcomes
