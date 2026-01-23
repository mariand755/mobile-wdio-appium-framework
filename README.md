## 📱 Mobile Automation Framework (WDIO v9 + Appium v2 + TypeScript)

A production‑grade mobile automation framework built with WebdriverIO v9, Appium v2, and TypeScript, supporting:

* ✅ Android local execution (via Docker + Emulator)
* ☁️ Sauce Labs cloud execution (Android + iOS)
* 🧪 Spec / Suite / Tag‑based execution (Smoke, Regression, etc.)
* 📊 Allure reporting (local & Docker)
* 🔁 CI‑ready (GitHub Actions friendly)

This framework is designed to mirror real‑world mobile QE setups:

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
│       ├── regression/     # (future)
│       └── e2e/            # (future)
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
> ⚠️ Xcode is **not required** unless you plan to run iOS locally. Sauce Labs handles iOS cloud execution.

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

* SAUCE_ANDROID_DEVICE=Google Pixel 6 GoogleAPI Emulator
* SAUCE_ANDROID_PLATFORM_VERSION=13

* SAUCE_IOS_DEVICE=iPhone 14 Simulator
* SAUCE_IOS_PLATFORM_VERSION=16

---

## ▶️ Running Tests
Android – Local (Docker + Emulator)
* `npm run docker:android:local`
> Starts Appium inside Docker and connects to your local emulator via ADB.

---

### Sauce Labs – Cloud
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
> Runs a specific suite (smoke, regression, e2e) on Sauce Labs.

---

## 🧪 Test Organization
* Smoke → PR gate / fast feedback
* Regression → nightly / scheduled
* E2E → release validation
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

## 🔁 CI / GitHub Actions (Next Steps)
Planned:
* ✅ PR gate → **Smoke suite only**
* 🏷️ Tag‑based execution
* ⚡ Parallel scaling (within Sauce limits)
* 🔐 Secrets via GitHub Actions

---

## 🚀 Why This Framework
This repo is intentionally structured to reflect SDET best practices:
* Clean config separation (shared vs platform‑specific)
* CI‑first mindset
* Scalable test organization
* Real device + emulator support

---

## 📝 License
Do not distribute or use this code without permission.
