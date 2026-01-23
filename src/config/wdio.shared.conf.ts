import path from 'node:path';
import * as dotenv from 'dotenv';
import allureReporter from '@wdio/allure-reporter';
dotenv.config();

export const config: WebdriverIO.Config = {
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

  if (isSauce) {
    try {
      await browser.execute(`sauce:job-result=${passed ? 'passed' : 'failed'}`);
    } catch (_) {
      // ignore if session already ended
    }
  }
},

  suites: {
    smoke: ['./src/tests/smoke/**/*.spec.ts'],
  // later:
  // regression: ['./src/tests/regression/**/*.spec.ts'],
  // e2e: ['./src/tests/e2e/**/*.spec.ts'],
  },
};
