# Salesforce Sandbox Testing Checklist for AI Case Triage Assistant

## 1. Org setup

- sandbox org is available and accessible
- user has System Administrator or equivalent access
- Lightning Experience is enabled
- Case object is available
- the project metadata is deployed successfully

## 2. Deployment validation

- Apex class deploys without errors
- test class deploys without errors
- LWC bundle deploys without errors
- no missing component dependencies remain

## 3. UI validation on Case page

- open a Case record page
- add the `AI Case Triage` component to the page layout
- save and activate the page
- verify the component renders without JavaScript errors
- confirm the page remains stable

## 4. Scenario 1: Login issue case

### Test data

- Subject: `Login issue reported by customer`
- Origin: `Email`
- Priority: `High`
- Status: `New`

### Expected result

- component loads
- triage suggestions appear
- priority recommendation is shown
- queue recommendation is `Technical Support`

## 5. Scenario 2: Phone support case

### Test data

- Subject: `Order not received`
- Origin: `Phone`
- Priority: `Medium`
- Status: `New`

### Expected result

- route recommendation appears appropriately
- case panel remains usable
- no UI crash occurs

## 6. Scenario 3: Empty-state validation

### Test steps

- navigate to a non-Case page or a page without case context

### Expected result

- the component shows a graceful empty message or no suggestion state
- page remains stable
- no unexpected errors appear

## 7. Flow and automation validation

- create a case that matches a risky scenario
- verify the automation triggers correctly
- confirm queue or escalation logic behaves as expected
- review notifications or tasks if configured

## 8. Security validation

- log in as a standard support user
- confirm the user can access the triage panel
- verify restricted admin actions are not visible or accessible unless allowed
- check that sharing rules are respected

## 9. Regression validation

- create and update a few more cases
- verify the standard Case experience is unchanged apart from the panel
- no unrelated workflows are broken

## 10. Sign-off checklist

The app is ready for the next stage only if all of the following pass:

- Apex tests pass
- LWC loads in the org
- routing logic matches expected outcomes
- no errors occur in the support console
- business value is validated by a real user
- security and permissions are acceptable
- no critical defects remain

## Final decision

- If all checks pass: approve for promotion to the next environment
- If any check fails: fix and retest before moving forward
