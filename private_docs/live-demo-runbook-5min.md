# Live Demo Runbook (5 Minutes)

Purpose:
- Give a crisp, repeatable interview demo flow using this repository.

## Demo Goal

Show that the framework is:
- Deterministic
- Scalable
- SDLC-aligned
- Decision-ready (not just test-execution capable)

## Pre-Demo Checklist (Do Before Interview)

- Emulator is running and visible to adb.
- Docker Desktop is running.
- Repo is on the correct branch/state.
- Have one successful local regression run ready as fallback evidence.
- Keep these files open in tabs:
  - docs/decision-log.md
  - private_docs/interview-cheat-sheet.md
  - src/config/wdio.shared.conf.ts
  - .github/workflows/mobile-tests.yml

## Minute-By-Minute Script

### 0:00-0:45 — Context and objective

Say:
- "This repo demonstrates a production-style mobile test architecture with WDIO + Appium, optimized for deterministic local execution and scalable cloud validation."
- "I’ll show how reliability controls and SDLC quality strategy are implemented, not just test scripts."

### 0:45-1:45 — Architecture walk

Show:
- test structure (smoke vs regression)
- shared config and platform-specific configs
- Docker runner script

Say:
- "Smoke is for fast PR confidence; regression is for broader risk coverage."
- "Shared config keeps behavior consistent across local and cloud contexts."

### 1:45-2:45 — Reliability controls

Show in config:
- deterministic suite patterns
- artifact capture on failure
- guarded Sauce metadata publishing with credential health checks

Say:
- "I hardened this to prevent false operational failures from being mistaken as product defects."

### 2:45-3:45 — CI and reporting

Show:
- GitHub workflow file
- Allure generation/upload steps

Say:
- "CI produces evidence artifacts for triage and trend analysis."
- "This enables both engineer debugging and stakeholder visibility."

### 3:45-4:30 — SDLC strategy and roadmap

Show:
- docs/decision-log.md sections: SDLC coverage + roadmap

Say:
- "The strategy maps quality gates to PR, nightly, and release stages with explicit trade-offs."

### 4:30-5:00 — Close with impact

Say:
- "The practical outcome is fewer noisy failures, faster triage, and higher trust in red builds."
- "From here, I’d scale matrix coverage and governance metrics based on product risk and cost constraints."

## Optional Live Command (If Asked)

Use direct Docker command path for a regression run:

```bash
docker build -t wdio-appium-android-local -f docker/Dockerfile . && \
docker run --name wdio-android-local --rm -it \
  -e ADB_SERVER_SOCKET=tcp:host.docker.internal:5037 \
  -e ANDROID_ADB_SERVER_PORT=5037 \
  -v "$PWD":/work \
  -v "$PWD/docker/.workdir":/work/docker/.workdir \
  -w /work \
  wdio-appium-android-local \
  bash -lc "bash ./docker/run-android-local.sh --suite regression"
```

## If Something Breaks During Demo

Fallback line:
- "I’ll use the last successful run artifacts and explain the triage model, since robust failure handling is part of the architecture story."

Then show:
- Allure artifacts
- config guardrails
- strategy and roadmap sections

## High-Value Phrases

- "Quality signal integrity"
- "Deterministic execution boundary"
- "Stage-based confidence model"
- "Best-effort metadata publishing"
- "Risk-to-gate traceability"
