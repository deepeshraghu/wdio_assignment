import AppScreen from './AppScreen';

class CheckoutAddressScreen extends AppScreen {
  constructor() {
    super('~checkout address screen'); // Uses the selector for the checkout address screen
  }

  /**
   * Waits for the checkout address screen to be displayed.
   *
   * This method pauses execution until the checkout address screen
   * element is visible, ensuring that interactions can proceed.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the screen is displayed.
   */
  async waitForIsShown() {
    await $(this.selector).waitForDisplayed();
  }

  /**
   * Checks if the checkout address screen is currently displayed.
   *
   * This method returns a boolean indicating the visibility state of
   * the checkout address screen.
   *
   * @async
   * @returns {Promise<boolean>} - Resolves to `true` if the screen is displayed, `false` otherwise.
   */
  async isShown() {
    return $(this.selector).isDisplayed();
  }
}

export default new CheckoutAddressScreen();
