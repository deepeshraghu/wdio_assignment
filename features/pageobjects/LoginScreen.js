// screen-objects/LoginScreen.js

import { getTextOfElement, locatorStrategy } from '../helpers/utils';

class LoginScreen {
  get usernameField() {
    return $('~Username input field');
  }

  get passwordField() {
    return $('~Password input field');
  }

  get loginButton() {
    return $('~Login button');
  }

  async submitLogin(user) {
    await this.usernameField.setValue(user.username);
    await this.passwordField.setValue(user.password);
    await this.loginButton.click();
  }

  async submitLoginWithAutofill(autofill) {
    if (autofill) {
      // Autofill button can be simulated here
      await $('~autofillLogin').click();
    }
    await this.loginButton.click();
  }

  async getUsernameErrorMessage() {
   const errorMessageElement = await $('~Username-error-message');
   return await getTextOfElement(errorMessageElement)
  }

  async getPasswordErrorMessage() {
    const errorMessageElement = await $('~Password-error-message');
    return await getTextOfElement(errorMessageElement)
  }

  async getGenericErrorMessage() {
    const errorMessageElement = await $('~generic-error-message');
    return await getTextOfElement(errorMessageElement)
  }

  async waitForIsShown() {
    await this.usernameField.waitForDisplayed();
  }

  async isShown() {
    return this.usernameField.isDisplayed();
  }
}

export default new LoginScreen();
