# Test Data And Environment Policy

## Purpose
Define safe and repeatable handling of test data, credentials, and runtime environments.

## Current Reality
- Environment setup is managed through `.env` and `.env.example`.
- Sauce credentials and app references are required for cloud runs.
- Local Android runs are Docker-first and use host emulator connectivity.

## Data Handling Principles
- Use deterministic test users and stable seed data where possible.
- Keep secrets out of source control.
- Keep local defaults safe and non-destructive.

## Environment Variables
Key variables used today:
- `SAUCE_USERNAME`
- `SAUCE_ACCESS_KEY`
- `SAUCE_ANDROID_APP`
- `SAUCE_IOS_APP`
- `SAUCE_REGION`
- `RUN_ON_SAUCE`
- `ENABLE_SAUCE_JOB_RESULT`

Policy:
- Use `.env.example` as canonical template.
- Use CI secrets for sensitive values.
- Do not hardcode credentials in code or docs.

## Environment Consistency
- Local Android execution should run through Docker.
- Cloud execution should run through Sauce config only.
- Keep config differences explicit and minimal.

## Data Reset Expectations
- Tests should avoid hidden cross-test dependencies.
- Prefer isolated setup/teardown patterns within specs.
- Record known stateful dependencies in test docs when unavoidable.

## Near-Term (Target State)
- Add explicit test account catalog and intended usage.
- Add environment validation preflight script.
- Add secret-rotation checklist for Sauce credentials.
