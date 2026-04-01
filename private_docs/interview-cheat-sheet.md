# Interview Cheat Sheet (One Page)

## Prep Pack Links

- interviewer Q&A bank: private_docs/interviewer-qa-bank.md
- startup vs enterprise role tailoring: private_docs/role-tailoring-startup-vs-enterprise.md
- 5-minute live demo flow: private_docs/live-demo-runbook-5min.md

## 30-Second Pitch

I built a production-style mobile QA automation framework with WDIO + Appium, designed for deterministic local execution via Docker and scalable cloud execution via Sauce Labs. The strategy is layered (smoke for fast confidence, regression for deeper risk coverage), evidence-driven through Allure artifacts, and resilient against false operational failures using guarded metadata publishing and credential health checks.

## Core Wins To Highlight

- Stabilized local execution with Docker-first model.
- Fixed suite discovery reliability for regression runs.
- Reduced false-fail noise by gating Sauce job-result publishing.
- Added Sauce credential health check before metadata publishing.
- Strengthened strategy narrative across SDLC: observability, CI/CD, cloud, reporting, notifications.

## Senior SDET Version (What To Emphasize)

- Engineering depth in config/runtime reliability.
- Fast root-cause and pragmatic fixes.
- Framework maintainability and repeatability.

Sound bites:
- I removed non-determinism first, then scaled.
- I made failures diagnosable before optimizing speed.
- I treated metadata publishing as best-effort, not a blocker.

## QA Architect Version (What To Emphasize)

- Quality operating model across PR, nightly, and release stages.
- Risk-based suite strategy with governance and metrics.
- Cloud cost-awareness with controlled scaling.

Sound bites:
- I designed the quality signal, not just the tests.
- I separated product risk from platform noise.
- I tied quality gates to decision points in the SDLC.

## Interview Questions To Prep

- How do you define and enforce quality gates by stage?
- How do you distinguish flaky tests from product defects?
- How do you optimize cloud execution cost without losing coverage?
- What metrics prove your strategy is improving quality?

## KPI Set To Mention

- PR smoke pass stability.
- Regression flake rate.
- Mean time to triage.
- Pipeline feedback time.
- Release-blocking defect escape rate.

## 30/60/90 Narrative

- 30 days: stabilize execution and gates.
- 60 days: improve observability and triage workflows.
- 90 days: scale matrix, optimize cost, institutionalize governance.
