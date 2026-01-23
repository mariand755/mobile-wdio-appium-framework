import { BaseScreen } from '../core/BaseScreen';

/**
 * ProductsScreen represents the post-login product list.
 * We use a “screen is ready” element as the canonical assertion that login succeeded.
 */
class ProductsScreen extends BaseScreen {
  get title() {
    return $('~test-PRODUCTS');
  }

  async expectVisible() {
    await this.waitForDisplayed(this.title);
  }
}

export default new ProductsScreen();
