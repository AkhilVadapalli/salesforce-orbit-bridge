# Salesforce Sandbox Deployment Sequence for AI Case Triage Assistant

## Goal

Move the project from repo state into a Salesforce sandbox and validate it end-to-end before any production promotion.

## Step 1: Prepare the org

- open or create a Salesforce sandbox org
- confirm you have System Administrator or equivalent access
- check that Lightning Experience is enabled
- confirm the Case object is available
- confirm metadata deployment tools are available

## Step 2: Prepare the metadata

- ensure the Apex class is complete and compiles
- ensure the LWC component metadata is present
- confirm the component is packaged with the required files
- validate that the project does not rely on unsupported or missing configuration

## Step 3: Deploy to sandbox

Deploy the following metadata:

- Apex class: `CaseTriageService`
- Apex test class: `CaseTriageServiceTest`
- LWC bundle: `caseTriagePanel`

### Expected deployment result

- no compile errors
- no missing dependencies
- no Apex syntax issues
- LWC bundle deploys successfully

## Step 4: Add the LWC to the Case page

- go to Lightning App Builder
- open the Case record page
- add the `AI Case Triage` component
- save and activate the page

## Step 5: Run the test cases

Use the QA script from `qa-script.md` and create the following scenarios:

1. Login issue by email
2. Phone case with order issue
3. Empty-state validation
4. Security validation
5. Automated routing validation

## Step 6: Validate behavior

Check the following:

- component loads on the page
- suggestion cards render
- priority values appear correctly
- routing values are sensible
- no JavaScript errors occur
- page remains stable during use

## Step 7: Remediate issues

If any fail:

- fix the Apex logic
- adjust routing rules
- resolve LWC rendering issues
- retest after each fix

## Step 8: Promote only after sign-off

Only move to the next environment after:

- unit tests pass
- QA script is complete
- security checks pass
- business user confirms the workflow adds value
- no critical defects remain

## Final rule

Do not promote to production or package for AppExchange until the sandbox validation is complete and signed off.
