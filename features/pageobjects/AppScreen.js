export default class AppScreen {
  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Wait for the login screen to be visible
   *
   * @param {boolean} isShown
   */
  async waitForIsShown(isShown = true) {
    try {
      return await $(this.selector).waitForDisplayed({
        reverse: !isShown,
      });
    } catch (ign) {
      return !isShown;
    }
  }

  async isShown(element) {
    const el = element || await $(this.selector);
    return el.isDisplayed();
  }
}
