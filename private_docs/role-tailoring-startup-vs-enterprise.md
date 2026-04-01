# Role Tailoring: Startup Vs Enterprise (Private)

Purpose:
- Help you quickly adapt the same repo story to different company contexts.

## Core Message (Always Keep)

- Deterministic execution first.
- Layered quality strategy (smoke/regression).
- Evidence-driven triage (Allure + artifacts).
- Non-product failure reduction via guardrails.

## Startup Version

What interviewers usually care about:
- Speed of iteration.
- Ownership breadth.
- Ability to ship practical solutions quickly.
- Cost-awareness with limited resources.

How to position this repo:
- I prioritized fast, stable feedback by hardening the local and CI path first.
- I kept architecture lean: minimal moving parts, explicit guardrails, fast recovery from failure.
- I introduced risk-based execution so we avoid paying cloud cost on every change.

Language to use:
- "I optimized for fast signal and low operational friction."
- "I focused on high-impact fixes that reduce red-build noise quickly."
- "I built a path that scales without overengineering early."

What to avoid:
- Over-indexing on process-heavy governance terms.
- Presenting roadmap as a long bureaucracy.

## Enterprise Version

What interviewers usually care about:
- Consistency across teams.
- Governance and policy alignment.
- Auditability and release controls.
- Predictable quality at scale.

How to position this repo:
- I defined a stage-based quality model aligned to SDLC checkpoints.
- I separated product failures from infra/reporting noise to improve release confidence.
- I designed observability and reporting as decision-support systems, not just logs.

Language to use:
- "I aligned quality gates to release risk and stakeholder decision points."
- "I designed for repeatability, auditability, and operational resilience."
- "I used measurable KPIs and ownership boundaries to sustain quality at scale."

What to avoid:
- Framing everything as ad hoc or person-dependent.
- Ignoring governance and compliance implications.

## 60-Second Example Answer (Startup)

"I built a mobile test architecture that gives reliable feedback quickly. I made local runs deterministic using Docker, kept cloud execution scalable with Sauce, and layered suites so PR checks stay fast while regression runs give deeper confidence. I also reduced false failures by gating non-critical metadata publishing behind explicit controls and credential checks. The result is faster triage, fewer noisy failures, and a practical path to scale coverage without runaway cloud cost."

## 60-Second Example Answer (Enterprise)

"I designed the framework as a quality operating model across SDLC stages. Smoke and regression are mapped to PR, nightly, and release checkpoints, with clear trade-offs between speed and confidence. I introduced deterministic execution controls, evidence-rich reporting, and resilience guards to separate product risk from platform noise. This improves trust in pipeline signals and supports predictable release decisions with measurable governance metrics."

## Quick Toggle Prompts (Use Before Interview)

- If asked about impact: lead with business outcome and delivery speed.
- If asked about architecture: lead with risk model, controls, and governance.
- If panel is mixed: start startup-style, close enterprise-style.
