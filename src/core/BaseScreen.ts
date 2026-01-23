import { waits } from './waits';

/**
 * BaseScreen is the foundation of the Screen Object Model (aka Page Object Model for mobile).
 * It contains shared behaviors (waiting, tapping, typing) so each screen class stays focused on business actions.
 * If you later add retries, better logging, or analytics hooks, BaseScreen is the clean central place to do it.
 */
export class BaseScreen {
  protected async waitForDisplayed(el: WebdriverIO.Element, timeout = waits.defaultTimeoutMs) {
    await el.waitForDisplayed({ timeout });
  }

  protected async tap(el: WebdriverIO.Element) {
    await this.waitForDisplayed(el);
    await el.click();
  }

  protected async type(el: WebdriverIO.Element, value: string) {
    await this.waitForDisplayed(el);
    await el.setValue(value);
  }
}
