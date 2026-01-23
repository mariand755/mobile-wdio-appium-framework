# Mobile Automation Framework (WDIO v9 + Appium v2 + TypeScript + Mocha)

This repo provides a portable mobile automation framework that supports:
- Android local execution (Android Emulator) using Docker as the dependency/Appium runtime
- Sauce Labs execution (Android + iOS) with a simple config switch
- Allure reporting

## Requirements (Local Machine)
- Docker Desktop
- Android Studio + an Android Emulator (Pixel 7 API 34 recommended)
- Xcode (only required if you later choose iOS local runs; Sauce does not require this for cloud runs)

## App Binaries
Download from Sauce Labs sample app releases and place them here:
- `apps/android/sample.apk`
- `apps/ios/sample.app`

## Install / Run (Android Local via Docker)
1) Start your Android emulator (Pixel 7 API 34).
2) Verify ADB sees it:
   - `adb devices`
   - You should see something like `emulator-5554 device`
3) Run:
   - `npm run docker:android:local`

## Sauce Labs Setup
1) Copy `.env.example` to `.env`
2) Fill in:
   - `SAUCE_USERNAME`
   - `SAUCE_ACCESS_KEY`
3) Upload your apps to Sauce storage (we’ll add scripted upload in a later step).
4) Run:
   - `npm run test:sauce`

## Reporting (Allure)
After a test run:
- Generate report: `npm run report:generate`
- Open report: `npm run report:open`

## Local (requires Java):
- npm run report:generate
- npm run report:open

## Docker (no Java needed):
- npm run docker:report:generate
- npm run docker:report:open