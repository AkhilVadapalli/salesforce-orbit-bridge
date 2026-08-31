# AI Case Triage Assistant Architecture

## Overview

This project is a Salesforce-native workflow that helps support teams triage incoming customer cases faster and more consistently.

## High-Level Architecture

- Salesforce Case object is the source of truth.
- Apex service handles processing and orchestration.
- Flow automates case routing and notifications.
- LWC provides a summary panel for triage recommendations.
- AI service generates a summary, urgency assessment, and draft response ideas.

## Core Components

### 1. Case Intake

- case is created or updated
- relevant metadata is collected
- customer context is assembled

### 2. Triage Logic

- evaluate case urgency
- detect patterns in case history
- route based on support domain
- identify service risks and SLA exposure

### 3. AI Recommendation Layer

- summarize case notes and prior interactions
- suggest priority and category
- draft a response for the agent
- create a recommended next action

### 4. Human Review

- agent reviews recommendation
- can accept, edit, or reject suggestion
- approval is logged for future scenarios

### 5. Workflow Automation

- assign case to queue
- send alert to manager for escalation
- update case fields and tags

## Design Principles

- keep the Salesforce record as the system of record
- keep AI suggestions reviewable and explainable
- make workflow actions transparent
- avoid lock-in to one AI provider
- design for business value, not just technical novelty

## Example Flow

1. Case enters support queue.
2. Apex class collects key case details.
3. AI request is generated.
4. Response is normalized into a recommendation object.
5. Flow updates the case and notifies stakeholders.
6. Agent uses the recommendation to resolve faster.

## Why This is Portfolio-Ready

This design shows real operational relevance and demonstrates how Salesforce development can extend beyond simple UI work into product-like business tooling.
