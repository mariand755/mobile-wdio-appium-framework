class CartScreen {
  get title() { return $('~test-Cart'); } // cart title
  get checkoutBtn() { return $('~test-CHECKOUT'); }

  itemNameByText(name: string) {
  // Prefer accessibility id if present, but fall back to visible text on Android
  return driver.isAndroid
    ? $(`android=new UiSelector().textContains("${name}")`)
    : $(`~${name}`);
}


  async waitForLoaded() {
    // Wait for cart title to appear
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
