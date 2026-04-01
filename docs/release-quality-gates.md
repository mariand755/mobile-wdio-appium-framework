# Release Quality Gates

## Purpose
Define minimum quality evidence required for release go/no-go decisions.

## Current Reality
- Smoke and regression suites exist.
- CI cloud run exists (manual trigger) with Allure artifact output.
- Public governance document defines stage intent.

## Release Gate Inputs
- Latest smoke outcome
- Latest regression outcome
- Open high-severity defect list
- Infrastructure health notes from recent runs
- Allure evidence from latest candidate run

## Gate Decision Rules

### Must Pass
- Critical-path smoke tests pass.
- No unresolved Sev1 product defects for release scope.

### Must Be Reviewed
- Regression failures by category (product/test/infra).
- Any active waivers and expiry dates.

### Release Disposition
- Go: required gates met, no blocking risk.
- Conditional Go: explicit waiver approved with mitigation.
- No-Go: blocking criteria unresolved.

## Waiver Policy
- Waiver requires:
  - owner
  - risk statement
  - mitigation plan
  - expiry date
- Waivers do not remove accountability for follow-up fix.

## Near-Term (Target State)
- Add formal release checklist template in CI artifacts.
- Add auto-generated gate summary from run results.
- Add sign-off matrix (QA, Engineering, Release owner).
