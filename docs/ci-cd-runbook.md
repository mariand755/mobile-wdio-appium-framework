# CI/CD Runbook

## Purpose
Operational guide for running, diagnosing, and recovering CI test runs in this repository.

## Current Reality
- CI workflow: [.github/workflows/mobile-tests.yml](../.github/workflows/mobile-tests.yml)
- Trigger: `workflow_dispatch` only.
- Primary CI path: Sauce Labs run via `npm run test:sauce`.
- Report outputs:
  - `allure-results` artifact
  - `reports/allure-report` artifact

Retry behavior:
- `connectionRetryCount`/`connectionRetryTimeout` handle WebDriver transport retries to Sauce.
- Mocha test retries in Sauce are controlled by `SAUCE_TEST_RETRY_COUNT` (default `1`).
- A retry pass should still be reviewed for flaky classification.

Stage retry policy:
- PR smoke gate: `SAUCE_TEST_RETRY_COUNT=1`
- Nightly regression: `SAUCE_TEST_RETRY_COUNT=2`
- Release hardening gate: `SAUCE_TEST_RETRY_COUNT=1` (or `0` for strict mode)

CI override guidance:
- Keep repository default at `1` in config for safe baseline behavior.
- Set stage-specific retry count through workflow/job environment variables.

## Preconditions
- GitHub repository secrets are set:
  - `SAUCE_USERNAME`
  - `SAUCE_ACCESS_KEY`
  - `SAUCE_ANDROID_APP`
  - `SAUCE_IOS_APP`
- Sauce app references are valid and accessible.

## Standard Run Flow
1. Trigger workflow manually from Actions.
2. CI checks out code and installs dependencies with `npm ci`.
3. Sauce tests execute with `npm run test:sauce`.
4. Allure report is generated and uploaded even on failures.

## Failure Triage Flow
1. Confirm failing stage in Actions summary.
2. Check test failure details in workflow logs.
3. Inspect `allure-results` and `allure-report` artifacts.
4. Classify failure type:
   - product defect
   - test defect
   - infrastructure/config issue
5. Create/attach ticket with owner and next action.

## Known Failure Signatures
- Sauce auth/permission errors:
  - verify secrets and account access.
- App reference errors:
  - verify Sauce app storage names.
- Infra/transient failures:
  - rerun once for classification confidence.

## Recovery Playbook
- Auth issue: rotate secret and re-run.
- App artifact issue: upload app again and update secret.
- Test-only issue: fix test/sync/selector and re-run.
- Product issue: raise defect and track against release criteria.

## Near-Term (Target State)
- Add PR trigger with smoke-only checks.
- Add nightly scheduled regression workflow.
- Add stage-specific quality gates (PR, nightly, release).
- Add Slack summary notification with artifact links.
