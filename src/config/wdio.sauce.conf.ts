import { config as shared } from './wdio.shared.conf';
import type { Options } from '@wdio/types';

type SauceConfig = Options.Testrunner & {
  capabilities: Array<Record<string, unknown>>;
};

/**
 * Sauce config enables running the same tests in the cloud with a simple script switch.
 * Instead of using local app paths, Sauce uses an uploaded app reference like:
 *   storage:filename=sample.apk
 *
 * This keeps tests identical across local and cloud runs, with only capabilities changing.
 */
const SAUCE_USERNAME = process.env.SAUCE_USERNAME || '';
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY || '';

if (!SAUCE_USERNAME || !SAUCE_ACCESS_KEY) {
  // We fail fast with a clear error so users know what to set before running Sauce.
  throw new Error('Missing SAUCE_USERNAME or SAUCE_ACCESS_KEY. Set them in your environment or .env file.');
}

const buildName =
  process.env.GITHUB_RUN_ID
    ? `gh-${process.env.GITHUB_RUN_ID}`
    : `local-${new Date().toISOString()}`;

const commonSauceOptions = {
  build: buildName,
  tags: process.env.GITHUB_REF_NAME ? [process.env.GITHUB_REF_NAME] : ['local'],
  extendedDebugging: true,
  capturePerformance: false,
  idleTimeout: 180,
};

export const config: SauceConfig = {
  ...shared,
  
  user: SAUCE_USERNAME,
  key: SAUCE_ACCESS_KEY,

  hostname: 'ondemand.us-west-1.saucelabs.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  connectionRetryTimeout: 600000,
  connectionRetryCount: 3,

  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.SAUCE_ANDROID_APP || 'storage:filename=Android.SauceLabs.apk',
      'appium:deviceName': process.env.SAUCE_ANDROID_DEVICE || 'Google Pixel 6 GoogleAPI Emulator',
      'appium:platformVersion': process.env.SAUCE_ANDROID_PLATFORM_VERSION || '13',
      'appium:appPackage': 'com.swaglabsmobileapp',
      'appium:appActivity': 'com.swaglabsmobileapp.SplashActivity',
      'appium:appWaitActivity': 'com.swaglabsmobileapp.*',
      'appium:appWaitDuration': 120000,
      'appium:newCommandTimeout': 180,
      
      'sauce:options': {
        ...commonSauceOptions,
        name: 'WDIO + Appium - Android Sample',
      },
    },
     
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:app': process.env.SAUCE_IOS_APP || 'storage:filename=iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.zip',
      'appium:deviceName': process.env.SAUCE_IOS_DEVICE || 'iPhone 14 Simulator',
      'appium:platformVersion': process.env.SAUCE_IOS_PLATFORM_VERSION || '16',
      'appium:newCommandTimeout': 180,
      'appium:waitForQuiescence': false,
      'appium:launchTimeout': 120000,


      'sauce:options': {
        ...commonSauceOptions,
        name: 'WDIO + Appium - iOS Sample',
      },
    }, 
  ],
  beforeSession: function (_config, capabilities: any, specs) {
    const specName = specs?.[0]?.split('/').pop();
    // @ts-ignore
    capabilities['sauce:options'] = capabilities['sauce:options'] || {};
    // @ts-ignore
    capabilities['sauce:options'].name =
      specName || capabilities?.['sauce:options']?.name || 'WDIO run';
  },
};




