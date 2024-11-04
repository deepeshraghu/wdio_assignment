class CheckoutAddressScreen {
  /**
   * Waits for the checkout address screen to be displayed.
   *
   * This method will pause execution until the element representing the
   * checkout address screen is displayed on the screen. It is useful
   * for ensuring that the screen is visible before performing any actions
   * that depend on it being shown.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the element is displayed.
   */
  async waitForIsShown() {
    await $('~checkout address screen').waitForDisplayed(); // Waits until the element is displayed
  }

  /**
   * Checks if the checkout address screen is currently displayed.
   *
   * This method returns a boolean indicating whether the checkout address
   * screen is visible on the screen. It can be used to verify the screen's
   * visibility before proceeding with any operations.
   *
   * @async
   * @returns {Promise<boolean>} - A promise that resolves to true if the element is displayed, otherwise false.
   */
  async isShown() {
    return $('~checkout address screen').isDisplayed(); // Returns the display status of the element
  }
}

export default new CheckoutAddressScreen();
