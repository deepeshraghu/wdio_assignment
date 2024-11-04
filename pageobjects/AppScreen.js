export default class AppScreen {
  /**
   * Initializes the AppScreen with a selector.
   *
   * @param {string} selector - The selector for the main element on the screen.
   */
  constructor(selector) {
    this.selector = selector;
  }

  /**
   * Waits for the main element on the screen to be visible or hidden, based on the provided parameter.
   *
   * @param {boolean} isShown - Whether to wait for the element to be shown (true) or hidden (false).
   * @returns {Promise<boolean>} - Resolves to true if the element is in the expected visibility state, false otherwise.
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

  /**
   * Checks if a specific element or the main screen element is currently displayed.
   *
   * @param {WebdriverIO.Element} [element] - Optional element to check. If not provided, defaults to the main screen element.
   * @returns {Promise<boolean>} - Resolves to true if the element is displayed, false otherwise.
   */
  async isShown(element) {
    const el = element || await $(this.selector);
    return el.isDisplayed();
  }
}
