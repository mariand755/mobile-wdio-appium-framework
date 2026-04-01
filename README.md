## 📱 Mobile Automation Framework (WDIO v9 + Appium v2 + TypeScript)

A production‑grade mobile automation framework built with WebdriverIO v9, Appium v2, and TypeScript, supporting:

* ✅ Android local execution (via Docker + Emulator)
* ☁️ Sauce Labs cloud execution (Android + iOS)
* 🧪 Spec / Suite / Tag‑based execution (Smoke, Regression, etc.)
* 📊 Allure reporting (local & Docker)
* 🔁 CI‑ready (GitHub Actions friendly) - WIP

This framework is designed to mirror real‑world mobile QE setups:

QA strategy and execution plan are documented in [docs/decision-log.md](docs/decision-log.md).
Public QA governance model is documented in [docs/qa-governance.md](docs/qa-governance.md).

Quality docs index:
- CI/CD runbook: [docs/ci-cd-runbook.md](docs/ci-cd-runbook.md)
- Flaky test policy: [docs/flaky-test-policy.md](docs/flaky-test-policy.md)
- Defect triage SOP: [docs/defect-triage.md](docs/defect-triage.md)
- Test data and environment policy: [docs/test-data-and-env.md](docs/test-data-and-env.md)
- Release quality gates: [docs/release-quality-gates.md](docs/release-quality-gates.md)
- Quality metrics: [docs/quality-metrics.md](docs/quality-metrics.md)

---

## 🧱 Tech Stack
* WebdriverIO v9
* Appium v2
* TypeScript
* Mocha 
* Allure Reports
* Docker (for local Android runs & reporting)
* Sauce Labs (Android & iOS cloud devices)

---

## 📂 Project Structure
mobile-wdio-appium-framework/
├── .github/                # (CI workflows – coming next)
├── apps/                   # Mobile app binaries
│   ├── android/
│   └── ios/
├── docker/                 # Dockerfiles & run scripts
├── src/
│   ├── config/             # WDIO configs (shared / android / sauce)
│   ├── core/               # Base helpers & utilities
│   ├── screens/            # Screen / Page Objects
│   ├── testdata/           # Test data
│   └── tests/
│       ├── smoke/          # Smoke test specs
│       ├── regression/     # (will have extensive) regression specs
│       └── e2e/            # future: end-to-end specs      
├── reports/                # Allure reports output (ignore in git)
├── .gitignore
│    
├── .env.example
├── package.json
├── tsconfig.json
└── README.md

---

## ⚙️ Prerequisites
Local Machine Setup:
   * Node.js >= 20 <21
   * Docker Desktop
   * Android Studio + Emulator (Pixel / Google API)
> ⚠️ Xcode is **not required** unless you want to run iOS locally. Sauce Labs handles iOS cloud execution.

---

## 📦 App Binaries
Local
   Place apps here:
   * `apps/android/Android.SauceLabs.apk`
   * `apps/ios/iOS.Simulator.SauceLabs.Mobile.Sample.app.zip`

### Sauce Labs
Upload apps to Sauce storage and reference them as:
* `storage:filename=Android.SauceLabs.apk`
* `storage:filename=iOS.Simulator.SauceLabs.Mobile.Sample.app.zip`

---

## 🔐 Environment Setup 
* `cp .env.example .env`


Edit `.env` with your Sauce Labs credentials and desired device/platform versions
* SAUCE_USERNAME=your_username
* SAUCE_ACCESS_KEY=your_access_key
* ENABLE_SAUCE_JOB_RESULT=false

* SAUCE_ANDROID_DEVICE=Google Pixel 6 GoogleAPI Emulator
* SAUCE_ANDROID_PLATFORM_VERSION=13

* SAUCE_IOS_DEVICE=iPhone 14 Simulator
* SAUCE_IOS_PLATFORM_VERSION=16

Set `ENABLE_SAUCE_JOB_RESULT=true` only when you explicitly want to report pass/fail back to Sauce from test hooks.
When enabled, the framework performs a credential health check against Sauce API before publishing job results and skips publishing if credentials are invalid/expired.

---

## ▶️ Running Tests
Android – Local (Docker + Emulator)

Run all local Android tests directly with Docker
```bash
docker build -t wdio-appium-android-local -f docker/Dockerfile . && \
docker run --name wdio-android-local --rm -it \
   -e ADB_SERVER_SOCKET=tcp:host.docker.internal:5037 \
   -e ANDROID_ADB_SERVER_PORT=5037 \
   -v "$PWD":/work \
   -v "$PWD/docker/.workdir":/work/docker/.workdir \
   -w /work \
   wdio-appium-android-local \
   bash -lc "bash ./docker/run-android-local.sh"
```
> Builds the runner image, starts Appium inside Docker, and connects to your local emulator via ADB.

Run local Android regression suite
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
> Runs only the regression suite through the Docker-based Android local path.

Run local Android single spec
```bash
docker build -t wdio-appium-android-local -f docker/Dockerfile . && \
docker run --name wdio-android-local --rm -it \
   -e ADB_SERVER_SOCKET=tcp:host.docker.internal:5037 \
   -e ANDROID_ADB_SERVER_PORT=5037 \
   -v "$PWD":/work \
   -v "$PWD/docker/.workdir":/work/docker/.workdir \
   -w /work \
   wdio-appium-android-local \
   bash -lc "bash ./docker/run-android-local.sh --spec ./src/tests/regression/login.negative.spec.ts"
```
> Runs the negative login regression spec through Docker against your local Android emulator.

Shortcuts
* `npm run docker:android:local`
* `npm run docker:android:local:regression`
* `npm run docker:android:local:login-negative`
> These npm scripts are only wrappers around the direct Docker commands above.

---

## Sauce Labs – Cloud 
> 💡 Tip: During development or free-trial usage, running a single spec is recommended to conserve Sauce minutes.

Run all tests
* `npm run test:sauce`
> Runs all tests on both Android and iOS in Sauce Labs.

Run smoke suite
* `npm run test:sauce:smoke`
> Runs only smoke tests on both Android and iOS in Sauce Labs.

Run single spec
* `npm run test:sauce:spec -- ./src/tests/smoke/login.success.spec.ts`
> Runs a single spec file on Sauce Labs.

Run by suite
* `npm run test:sauce:suite -- smoke`
> Runs a specific suite (smoke, regression) on Sauce Labs.

---

## 🧪 Test Organization
* Smoke → PR gate / fast feedback
* Regression → nightly / scheduled
* E2E → release validation (future)
Suites are defined centrally in `wdio.shared.conf.ts`.

---

## 📊 Reporting (Allure)
Local
* `npm run report:generate`
* `npm run report:open`
> Generates and opens Allure report from local test runs.

Docker (no Java required)
* `npm run docker:report:generate`
* `npm run docker:report:open`
> Generates and opens Allure report from Docker test runs.

---

## ☁️ Sauce Labs Integration
* Job names automatically map to spec file names
* Pass / Fail status is reported back to Sauce
* Video, logs, screenshots captured automatically

---

## 🔁 CI / GitHub Actions (Next Steps) - WIP
Planned:
* ✅ PR gate → **Smoke suite only**
* 🏷️ Tag‑based execution
* ⚡ Parallel scaling (within Sauce limits)
* 🔐 Secrets via GitHub Actions

---

## 🚀 Why This Framework
This repo is intentionally structured to reflect SDET best practices:
* Clean config separation (shared vs platform‑specific)
* CI‑first mindset - WIP
* Scalable test organization
* Real device + emulator support

---

## 📝 License
This project is licensed under the GNU GPL v3. See the [LICENSE](LICENSE) file for the full text.
