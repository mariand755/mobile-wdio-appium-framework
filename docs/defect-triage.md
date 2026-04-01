# Defect Triage SOP

## Purpose
Standardize failure classification and ownership so quality signal stays actionable.

## Current Reality
- Failures can be diagnosed via CI logs and Allure artifacts.
- Triage process exists informally through run analysis.

## Classification Matrix
- Product defect:
  - app behavior deviates from expected acceptance criteria.
- Test defect:
  - unstable assertion, selector, or test logic issue.
- Infrastructure defect:
  - environment, emulator/device, service, or credential/system issue.

## Triage Steps
1. Reproduce or inspect failure evidence.
2. Review screenshot/page source and execution logs.
3. Assign failure class: product/test/infrastructure.
4. Create or update ticket with:
   - summary
   - evidence links
   - owner
   - severity
5. Decide immediate action:
   - block, fix-forward, quarantine, or waiver request.

## Severity Guide
- Sev1: critical path broken, release impact.
- Sev2: major behavior degraded, high risk.
- Sev3: non-critical behavior issue.
- Sev4: cosmetic/low-impact issue.

## Escalation Rules
- Escalate immediately when:
  - PR critical path fails repeatedly.
  - release-critical regression fails.
  - infra instability prevents reliable signal.

## Near-Term (Target State)
- Add triage template in issue tracker.
- Add automated links from CI run to defect ticket.
- Add weekly defect pattern review (top root causes).
