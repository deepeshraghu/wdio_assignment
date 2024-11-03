// screen-objects/CheckoutAddressScreen.js
class CheckoutAddressScreen {
  async waitForIsShown() {
    await $('~checkout address screen').waitForDisplayed();
  }

  async isShown() {
    return $('~checkout address screen').isDisplayed();
  }
}

export default new CheckoutAddressScreen();
