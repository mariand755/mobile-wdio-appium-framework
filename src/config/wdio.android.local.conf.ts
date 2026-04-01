import { config as shared } from './wdio.shared.conf';
import type { Options } from '@wdio/types';

type AndroidLocalConfig = Options.Testrunner & {
  capabilities: Array<Record<string, unknown>>;
};

/**
 * Android-local config is designed for running against an Android Emulator on your machine,
 * while the test runner + Appium server can live in Docker.
 *
 * Key idea:
 * - The emulator itself runs on the host (Android Studio)
 * - Appium (in Docker) talks to the emulator using ADB
 * - WDIO sends commands to Appium
 *
 * This file is where you tune deviceName/udid and app path for local development.
 */
export const config: AndroidLocalConfig = {
  ...shared,
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      // For local dev, keep this deterministic:
      // - noReset:false ensures app state does not leak between tests
      // - fullReset is intentionally avoided by default for speed and stability
      'appium:noReset': false,
      // If needed, set your emulator UDID (adb devices will show it).
      // Common default is "emulator-5554". You can override later via env if you prefer.
      'appium:udid': process.env.ANDROID_UDID || 'emulator-5554',
      // APK path inside the repo (and inside the Docker volume mount).
      'appium:app': './apps/android/Android.SauceLabs.apk',
      
      // --- stabilize launch / splash ---
      'appium:appWaitPackage': 'com.swaglabsmobileapp',
      'appium:appWaitActivity': 'com.swaglabsmobileapp.*',
      'appium:appWaitDuration': 60000,
      'appium:appWaitForLaunch': true,

      // --- stabilize UiAutomator2 startup ---
      'appium:uiautomator2ServerInstallTimeout': 60000,
      'appium:uiautomator2ServerLaunchTimeout': 60000,

      // --- reduce flaky UI timing on emulator ---
      'appium:disableWindowAnimation': true,

      // Optional quality-of-life timeouts
      'appium:newCommandTimeout': 300,

      // These settings let Appium (in Docker) connect to ADB on the host machine.
      'appium:remoteAdbHost': 'host.docker.internal',
      'appium:adbPort': 5037,
    },
  ],
};

