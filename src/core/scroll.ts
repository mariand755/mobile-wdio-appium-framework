export async function scrollToText(text: string) {
  // Android (UiAutomator2)
  if ((driver.capabilities as any)?.platformName?.toString().toLowerCase() === 'android') {
    // UiScrollable scrollIntoView by visible text
    const uiSelector =
      `new UiScrollable(new UiSelector().scrollable(true))` +
      `.scrollIntoView(new UiSelector().textContains("${text}"))`;
    await $(`android=${uiSelector}`).waitForDisplayed({ timeout: 120000 });
    return;
  }

  // iOS (XCUITest)
  // Try a few scrolls until element appears
  const maxScrolls = 8;
  for (let i = 0; i < maxScrolls; i++) {
    const el = $(`-ios predicate string:name CONTAINS "${text}" OR label CONTAINS "${text}" OR value CONTAINS "${text}"`);
    if (await el.isDisplayed().catch(() => false)) return;

    await driver.execute('mobile: scroll', { direction: 'down' });
  }

  throw new Error(`Could not find text after scrolling: "${text}"`);
}
