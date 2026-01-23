class CartScreen {
  get title() { return $('~test-Cart'); } // cart icon is same id; title sometimes differs per build
  get checkoutBtn() { return $('~test-CHECKOUT'); }

  itemNameByText(name: string) {
  // Prefer accessibility id if present, but fall back to visible text on Android
  return driver.isAndroid
    ? $(`android=new UiSelector().textContains("${name}")`)
    : $(`~${name}`);
}


  async waitForLoaded() {
    // A safe check is that CHECKOUT button is visible in cart
    await this.checkoutBtn.waitForDisplayed({ timeout: 120000 });
  }

  async assertItemInCart(name: string) {
    const el = this.itemNameByText(name);
    await el.waitForDisplayed({ timeout: 120000 });
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}

export default new CartScreen();
