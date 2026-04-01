# Quality Metrics

## Purpose
Define the core metrics used to evaluate automation and release confidence.

## Current Reality
- Allure results and reports are generated in CI.
- Suite structure supports stage-oriented analysis (smoke/regression).
- Metrics are not yet centrally published on a dashboard.

## Core KPI Set

### 1) Smoke Pass Stability
Definition:
- Percentage of smoke runs passing over a rolling window.

Why it matters:
- Indicates PR gate trustworthiness.

### 2) Regression Flake Rate
Definition:
- Ratio of flaky failures to total regression failures.

Why it matters:
- Distinguishes product risk from automation noise.

### 3) Mean Time To Triage (MTTT)
Definition:
- Average time from failure detection to classification (product/test/infra).

Why it matters:
- Measures operational responsiveness.

### 4) Pipeline Feedback Time
Definition:
- Time from run start to actionable outcome for the stage.

Why it matters:
- Directly impacts developer flow and release speed.

### 5) Release-Blocking Escape Count
Definition:
- Number of high-severity defects discovered after release that should have been gated.

Why it matters:
- Measures effectiveness of quality gates.

## Data Sources
- GitHub Actions run metadata
- Allure report artifacts
- Sauce execution metadata
- Defect tracker records

## Review Cadence
- Weekly: smoke stability, flaky trend, triage speed.
- Sprintly: regression signal quality and root-cause pattern review.
- Quarterly: gate effectiveness and roadmap adjustment.

## Near-Term (Target State)
- Add lightweight KPI snapshot in CI summary or scheduled report.
- Add trend tracking per suite and platform.
- Add threshold-based alerting for KPI degradation.
