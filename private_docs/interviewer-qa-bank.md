# Interviewer Q&A Bank (Private)

Purpose:
- High-signal prep for Senior SDET and QA Architect interviews.
- Questions are intentionally tough and scenario-based.

## How To Use

- Answer in 45-90 seconds each.
- Lead with decision logic, then implementation detail.
- Close with measurable outcomes.

## 1) Your framework sometimes fails in CI but passes locally. What is your triage model?

Ideal answer:
- I separate failure domains first: app defect vs test defect vs infrastructure defect.
- I check deterministic artifacts (Allure evidence, screenshots, page source, capability context, timestamps).
- I verify infra preconditions: emulator/ADB health, app package state, session bootstrap logs.
- I tag failures into recurring signatures and prioritize elimination of non-product noise.
- Outcome metric: lower flake rate and lower mean time to triage.

## 2) Why Docker-first for local mobile automation?

Ideal answer:
- Host drift is a top source of inconsistent test behavior.
- Docker standardizes Node/Appium/tooling versions and makes local runs closer to CI constraints.
- The trade-off is startup overhead, but reliability and reproducibility outweigh it for team-scale automation.

## 3) How do you prevent false failures from third-party integrations like Sauce metadata publishing?

Ideal answer:
- I treat metadata publishing as best-effort, not release-critical.
- I gate publishing with explicit environment intent and credential health checks.
- If credentials are invalid/expired or service is unavailable, tests still report product outcomes correctly.

## 4) Explain your quality gate strategy across SDLC stages.

Ideal answer:
- PR: smoke-only, strict critical-path pass requirement.
- Nightly: broader regression with controlled flaky tolerance and triage automation.
- Release: high-risk matrix coverage with explicit sign-off criteria.
- Each stage has different speed vs confidence trade-offs.

## 5) How do you decide what belongs in smoke vs regression?

Ideal answer:
- Smoke includes must-not-break flows tied to business-critical paths.
- Regression includes negative paths, state combinations, and integration-heavy scenarios.
- I periodically rebalance based on defect escape analysis and execution cost.

## 6) What metrics prove your strategy is working?

Ideal answer:
- PR feedback latency.
- Smoke pass stability.
- Regression flake rate.
- Mean time to triage.
- Release-blocking defect escape rate.
- I focus on trends and decision impact, not vanity counts.

## 7) How do you optimize cloud execution cost without losing confidence?

Ideal answer:
- Risk-based suite selection by stage.
- Controlled parallelism and targeted device matrix.
- Avoid running broad matrix on every commit.
- Use nightly/release windows for wider coverage.

## 8) A flaky test keeps reappearing. What is your policy?

Ideal answer:
- Immediate containment: quarantine with owner and reason.
- Root-cause categorization: timing, locator instability, data setup, environment.
- Preventive fix: improve synchronization, selectors, and setup controls.
- Exit quarantine only after stability criteria is met.

## 9) How do you make reports actionable for engineering and leadership?

Ideal answer:
- Engineers need root-cause evidence quickly.
- Leadership needs stage status, risk summary, and release impact.
- I use Allure for deep diagnostics and summarize outcomes in concise CI/Slack status signals.

## 10) How do you align automation architecture with product risk?

Ideal answer:
- Start from user-critical journeys and business impact.
- Build suite layers that map to risk tiers.
- Review production incidents and escaped defects to adjust coverage.
- Treat test architecture as a living risk-control system.

## 11) How do you handle credential expiry in cloud providers?

Ideal answer:
- Validate credential health before non-critical provider operations.
- Fail fast only when credential validity is required for the primary objective.
- Log clear remediation steps and avoid noisy retries that hide root cause.

## 12) Give one example of a strategic architecture decision you made and why.

Ideal answer:
- I shifted local execution to Docker-first and made cloud metadata updates opt-in with health checks.
- That reduced non-product failures, improved trust in red builds, and made triage faster.
- It balanced engineering speed with quality confidence.

## 13) Senior SDET framing of this repo (short)

- Focus: framework reliability, config correctness, and CI stability.
- Story: I removed non-determinism, fixed suite resolution, and hardened result integrity.

## 14) QA Architect framing of this repo (short)

- Focus: SDLC quality model, governance, and measurable outcomes.
- Story: I defined stage-based quality gates, cloud strategy, observability, and evolution roadmap.

## Final Tip

- Do not answer only with tools and libraries.
- Answer with decisions, trade-offs, and measurable impact.