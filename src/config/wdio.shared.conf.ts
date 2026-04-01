import path from 'node:path';
import * as dotenv from 'dotenv';
import allureReporter from '@wdio/allure-reporter';
import type { Options } from '@wdio/types';
dotenv.config();

let sauceCredentialHealthCache: boolean | null = null;

async function hasValidSauceCredentials(): Promise<boolean> {
  if (sauceCredentialHealthCache !== null) {
    return sauceCredentialHealthCache;
  }

  const username = process.env.SAUCE_USERNAME || '';
  const accessKey = process.env.SAUCE_ACCESS_KEY || '';
  if (!username || !accessKey) {
    sauceCredentialHealthCache = false;
    return false;
  }

  const region = process.env.SAUCE_REGION || 'us-west-1';
  const baseUrl =
    region === 'eu-central-1'
      ? 'https://api.eu-central-1.saucelabs.com'
      : 'https://api.us-west-1.saucelabs.com';

  try {
    const auth = Buffer.from(`${username}:${accessKey}`).toString('base64');
    const response = await fetch(`${baseUrl}/rest/v1/users/${username}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    sauceCredentialHealthCache = response.ok;
    return sauceCredentialHealthCache;
  } catch {
    sauceCredentialHealthCache = false;
    return false;
  }
}

type SharedConfig = Options.Testrunner & {
  autoCompileOpts: {
    autoCompile: boolean;
    tsNodeOpts: {
      transpileOnly: boolean;
      project: string;
    };
  };
};

declare const browser: {
  takeScreenshot(): Promise<string>;
  getPageSource(): Promise<string>;
  execute(script: string): Promise<unknown>;
};

// For a detailed explanation regarding each configuration property, visit:
// https://webdriver.io/docs/configurationfile
export const config: SharedConfig = {
  runner: 'local',
  specs: [path.join(process.cwd(), 'src', 'tests', '**', '*.spec.ts')],
  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 10 * 60 * 1000 },

  maxInstances: 1,

  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results', disableWebdriverStepsReporting: false }],
  ],
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },
  
afterTest: async function (_test, _context, { passed }) {
  // ---- Allure artifacts on failure (local + sauce) ----
  if (!passed) {
    try {
      await browser.takeScreenshot();
    } catch (_) {
      // ignore screenshot failures
    }

    try {
      const source = await browser.getPageSource();
      allureReporter.addAttachment('page-source.xml', source, 'text/xml');
    } catch (_) {
      // ignore page source failures
    }
  }

  // ---- Sauce job status (only when running on Sauce) ----
  const isSauce =
    !!process.env.SAUCE_USERNAME &&
    !!process.env.SAUCE_ACCESS_KEY &&
    (process.env.SAUCE === 'true' || process.env.RUN_ON_SAUCE === 'true');
  const enableSauceJobResult = process.env.ENABLE_SAUCE_JOB_RESULT === 'true';

  if (isSauce && enableSauceJobResult) {
    const credentialsAreValid = await hasValidSauceCredentials();
    if (!credentialsAreValid) {
      return;
    }

    try {
      await browser.execute(`sauce:job-result=${passed ? 'passed' : 'failed'}`);
    } catch (_) {
      // ignore if session already ended
    }
  }
},

  suites: {
    smoke: [path.join(process.cwd(), 'src', 'tests', 'smoke', '**', '*.spec.ts')],
    regression: [path.join(process.cwd(), 'src', 'tests', 'regression', '**', '*.spec.ts')],
  // later:
  // e2e: [path.join(process.cwd(), 'src', 'tests', 'e2e', '**', '*.spec.ts')],
  },
};
