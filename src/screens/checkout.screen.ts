class CheckoutScreen {
  get firstName() { return $('~test-First Name'); }
  get lastName() { return $('~test-Last Name'); }
  get zip() { return $('~test-Zip/Postal Code'); }
  get continueBtn() { return $('~test-CONTINUE'); }

  get finishBtn() { return $('~test-FINISH'); }
  get completeHeader() { return $('~test-CHECKOUT: COMPLETE!'); }

  async fillInfo(first: string, last: string, zip: string) {
    await this.firstName.waitForDisplayed({ timeout: 120000 });
    await this.firstName.setValue(first);
    await this.lastName.setValue(last);
    await this.zip.setValue(zip);
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.waitForDisplayed({ timeout: 120000 });
    await this.finishBtn.click();
  }

  async assertComplete() {
    await this.completeHeader.waitForDisplayed({ timeout: 120000 });
  }
}

export default new CheckoutScreen();
