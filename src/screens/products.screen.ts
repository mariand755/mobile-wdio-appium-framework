import { scrollToText } from '../core/scroll';

class ProductsScreen {
  get title() { return $('~test-PRODUCTS'); }
  get firstAddToCartBtn() { return $('~test-ADD TO CART'); } // first "ADD TO CART" button
  get cartIcon() { return $('~test-Cart'); }

  // Item title elements usually use this id on the sample app
  itemTitleByText(name: string) {
    // Build expose item title as accessibility text.
    // This predicate keeps it flexible.
    return $(`-ios predicate string:name == "${name}" OR label == "${name}"`);
  }

  async waitForLoaded() {
    await this.title.waitForDisplayed({ timeout: 120000 });
  }

  async addFirstItemToCart() {
    await this.firstAddToCartBtn.waitForDisplayed();
    await this.firstAddToCartBtn.click();
  }

  async openCart() {
    await this.cartIcon.waitForDisplayed();
    await this.cartIcon.click();
  }

  async scrollToItemName(name: string) {
    await scrollToText(name);
  }

 async isItemNameVisible(name: string) {
  // Android: look for visible text
  if ((driver.capabilities as any)?.platformName?.toString().toLowerCase() === 'android') {
    const androidEl = $(`android=new UiSelector().textContains("${name}")`);
    return androidEl.isDisplayed();
  }

  // iOS: try accessibility id first, then predicate
  const el = $(`~${name}`);
  if (await el.isExisting().catch(() => false)) return el.isDisplayed();

  const iosEl = $(`-ios predicate string:name CONTAINS "${name}" OR label CONTAINS "${name}"`);
  return iosEl.isDisplayed();
 }

}

export default new ProductsScreen();

