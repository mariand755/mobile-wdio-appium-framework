# QA Governance

This document defines how quality decisions are made for this repository across PR, nightly, and release stages.

## Governance Document Map
- CI/CD runbook: [ci-cd-runbook.md](ci-cd-runbook.md)
- Flaky test policy: [flaky-test-policy.md](flaky-test-policy.md)
- Defect triage SOP: [defect-triage.md](defect-triage.md)
- Test data and environment policy: [test-data-and-env.md](test-data-and-env.md)
- Release quality gates: [release-quality-gates.md](release-quality-gates.md)
- Quality metrics: [quality-metrics.md](quality-metrics.md)

Templates:
- Defect triage: [templates/defect-triage-template.md](templates/defect-triage-template.md)
- Waiver request: [templates/waiver-request-template.md](templates/waiver-request-template.md)
- Release sign-off: [templates/release-signoff-template.md](templates/release-signoff-template.md)

## Scope
Applies to:
- Mobile UI automation in this repo (WDIO + Appium)
- Local Android validation via Docker
- Cloud validation via Sauce Labs
- Test evidence and reporting via Allure artifacts

## Governance Principles
- Signal integrity first: pipeline failures should represent product risk, not avoidable platform noise.
- Stage-based confidence: different SDLC stages require different depth and strictness.
- Evidence before opinion: release and triage decisions rely on test artifacts and run metadata.
- Operational resilience: non-critical integrations (for example metadata publishing) are best-effort.

## SDLC Quality Gates

### PR Gate (Fast Confidence)
Objective:
- Protect critical user flows with low-latency feedback.

Gate policy:
- Run smoke-focused checks.
- Critical-path smoke tests must pass.
- Any failing critical path blocks merge until resolved or formally waived.

### Nightly Gate (Broad Confidence)
Objective:
- Detect regressions across wider coverage and negative paths.

Gate policy:
- Run regression suites.
- Failures are triaged by category: product defect, test defect, infrastructure issue.
- Flaky tests are tracked and quarantined per policy.

### Release Gate (Risk Decision)
Objective:
- Support release readiness decisions using risk-focused evidence.

Gate policy:
- Execute target smoke + regression subsets aligned to release risk.
- Review unresolved high-severity failures and exception requests.
- Release decision requires explicit pass/waiver disposition.

## Ownership Model
- QA/SDET owner:
  - Maintains test strategy, suite health, and triage policy.
- Feature team owner:
  - Owns product defects and app-level stability issues.
- DevOps/Platform owner:
  - Owns CI runtime, pipeline reliability, and secret management.
- Release owner:
  - Owns final release go/no-go decision with quality input.

## Triage And Escalation
Standard triage flow:
1. Confirm failure with artifacts (logs, screenshot, page source, run metadata).
2. Classify as product, test, or infrastructure failure.
3. Create/attach ticket with owner and SLA.
4. Re-run only when needed for classification confidence.

Retry guidance:
- Distinguish infrastructure retries (WebDriver/Sauce connection retries) from framework test retries.
- Allow limited test-level retry in Sauce for transient confidence checks.
- Do not treat "passed on retry" as a clean pass; track as potential flake until stabilized.

Escalate when:
- Critical path repeatedly fails in PR gate.
- Regression failure affects release-critical scope.
- Infrastructure instability causes repeated false-negative risk.

## Flaky Test Policy
- A test is considered flaky when it shows non-deterministic outcomes without product changes.
- Flaky tests may be quarantined with explicit owner and remediation plan.
- Quarantine is temporary and reviewed regularly.
- Quarantined tests are not ignored; they remain visible in reporting.

## Reporting Standard
Required evidence for failed runs:
- Test status by suite/spec
- Failure screenshot (when available)
- Page source attachment (when available)
- Runtime context (platform, device/emulator, environment)

Allure artifacts:
- Retain raw allure results and generated report outputs from CI runs.
- Use reports for triage, trend analysis, and release decision support.

## Exception And Waiver Policy
- Waivers are allowed only with documented rationale, owner, and expiry date.
- Waivers must include risk impact and mitigation plan.
- Expired waivers are invalid and must be re-approved.

## Metrics And Review Cadence
Core KPIs:
- Smoke pass stability
- Regression flake rate
- Mean time to triage
- Pipeline feedback time
- Release-blocking defect escape count

Review cadence:
- Weekly: suite health and flaky review
- Sprintly: quality gate effectiveness and escape analysis
- Quarterly: governance and roadmap update
