# Flaky Test Policy

## Purpose
Define how flaky tests are identified, contained, fixed, and reintroduced.

## Current Reality
- Smoke and regression suites exist.
- Failures are diagnosable with screenshots/page source and Allure artifacts.
- Dedicated automated quarantine flow is not yet implemented.

## Flaky Definition
A test is flaky when it passes and fails across repeated runs without meaningful product change.

## Detection Rules
- Suspect flaky when failure is non-reproducible locally or across reruns.
- Confirm flaky when repeated reruns produce inconsistent outcomes.
- Gather evidence before labeling:
  - logs
  - screenshots
  - page source
  - runtime context (device/platform/env)

## Retry Guardrails
- Framework test retries are allowed only for transient classification confidence.
- Current Sauce default is one Mocha retry (`SAUCE_TEST_RETRY_COUNT=1`).
- Retries must not be used to hide persistent product failures.
- Failure reporting should include initial failure and final retry disposition.

## Containment Policy
- Mark as flaky with an explicit owner.
- Remove from strict release gating only when justified.
- Keep flaky tests visible in reports; do not silently drop coverage.

## Remediation Policy
1. Identify root cause category:
   - synchronization/timing
   - unstable locator
   - test data/state coupling
   - infrastructure instability
2. Fix root cause and validate with repeated runs.
3. Re-enable in gating suites after stability is demonstrated.

## Ownership And SLA
- Test owner: drives root-cause fix.
- QA owner: monitors flaky inventory and trend.
- Suggested SLA: resolve or reclassify within one sprint.

## Near-Term (Target State)
- Add explicit flaky label/tagging convention.
- Add weekly flaky review and burn-down tracking.
- Add auto-reporting of top recurring flaky specs.
