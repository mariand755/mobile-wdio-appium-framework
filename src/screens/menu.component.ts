class MenuComponent {
  get menuBtn() { return $('~test-Menu'); }
  get logoutBtn() { return $('~test-LOGOUT'); }

  async logout() {
    await this.menuBtn.waitForDisplayed();
    await this.menuBtn.click();
    await this.logoutBtn.waitForDisplayed();
    await this.logoutBtn.click();
  }
}

export default new MenuComponent();
