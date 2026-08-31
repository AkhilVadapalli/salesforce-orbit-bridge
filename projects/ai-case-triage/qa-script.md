# Salesforce Sandbox QA Script for AI Case Triage Assistant

## Objective

Validate that the MVP works end-to-end in a Salesforce sandbox and is ready for promotion to the next environment.

## Test setup

- Create a sandbox copy of the project metadata
- Log in as a support agent user
- Open a Case record page with the triage panel added
- Verify the page loads without errors

## Test case 1: Standard case triage

### Steps

1. Create a new Case record.
2. Set Subject to: `Login issue reported by customer`
3. Set Origin to: `Email`
4. Set Priority to: `High`
5. Save the record.

### Expected result

- Triage panel loads
- At least 2 suggestions display
- Priority recommendation shows `High`
- Routing queue shows `Technical Support`

## Test case 2: Priority-support route

### Steps

1. Create a new Case record.
2. Set Subject to: `Order not received`
3. Set Origin to: `Phone`
4. Set Priority to: `Medium`
5. Save the record.

### Expected result

- Routing recommendation displays `Priority Support`
- Agent sees the case summary and routing guidance

## Test case 3: Empty state validation

### Steps

1. Navigate to a record page without a valid Case context or use a non-Case page.

### Expected result

- Component displays a graceful empty state or no suggestion message
- No page crash or JavaScript error

## Test case 4: Security validation

### Steps

1. Log in as a user without admin access.
2. Open the component on a Case record.
3. Confirm the user can read suggestions.
4. Attempt restricted administrative actions if any.

### Expected result

- Standard users can access the intended workflow
- Restricted actions remain hidden or blocked as expected

## Test case 5: Flow automation test

### Steps

1. Create a case with a risky subject or priority.
2. Confirm the automated flow is triggered.
3. Review queue assignment and any notifications.

### Expected result

- The flow runs without errors
- Case is assigned correctly
- Notification or escalation flow is triggered when appropriate

## Test case 6: Regression sanity check

### Steps

1. Create or edit existing cases in the org.
2. Confirm no unrelated automation is broken.

### Expected result

- Existing support workflows still behave normally
- No unexpected record updates occur

## Exit criteria

The project is ready for the next environment only when:

- all core test cases pass
- no page errors occur
- routing logic matches expected behavior
- security validation succeeds
- business users accept the flow

## Sign-off

Project owner or tester should sign off after successful completion of all test scenarios.
