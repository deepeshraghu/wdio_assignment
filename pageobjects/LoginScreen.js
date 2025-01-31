import AppScreen from './AppScreen';
import { getTextOfElement, locatorStrategy } from '../helpers/utils';

/**
 * Represents the Login Screen of the application.
 * Extends the AppScreen class to inherit common screen functionalities.
 */
class LoginScreen extends AppScreen {
  /**
   * Initializes the LoginScreen with its specific selector.
   */
  constructor() {
    super('~login screen'); // Update the selector to match the main element of the Login Screen
  }

  /**
   * Gets the username input field element.
   *
   * @returns {WebdriverIO.Element} The element representing the username input field.
   */
  get usernameField() {
    return $('~Username input field');
  }

  /**
   * Gets the password input field element.
   *
   * @returns {WebdriverIO.Element} The element representing the password input field.
   */
  get passwordField() {
    return $('~Password input field');
  }

  /**
   * Gets the login button element.
   *
   * @returns {WebdriverIO.Element} The element representing the login button.
   */
  get loginButton() {
    return $('~Login button');
  }

  /**
   * Submits the login form with the provided user credentials.
   *
   * This method fills in the username and password fields with the
   * values from the `user` object and clicks the login button to
   * attempt to log in.
   *
   * @async
   * @param {Object} user - An object containing user credentials.
   * @param {string} user.username - The username of the user attempting to log in.
   * @param {string} user.password - The password of the user attempting to log in.
   * @returns {Promise<void>} A promise that resolves when the login process is complete.
   */
  async submitLogin(user) {
    await this.usernameField.setValue(user.username); // Set the username
    await this.passwordField.setValue(user.password); // Set the password
    await this.loginButton.click(); // Click the login button
  }

  /**
   * Retrieves the error message displayed for the username field.
   *
   * This method looks for the error message related to the username
   * input field and returns its text content.
   *
   * @async
   * @returns {Promise<string>} A promise that resolves to the error message text if it is displayed.
   */
  async getUsernameErrorMessage() {
    const errorMessageElement = await $('~Username-error-message');
    return await getTextOfElement(errorMessageElement); // Get the error message text
  }

  /**
   * Retrieves the error message displayed for the password field.
   *
   * This method looks for the error message related to the password
   * input field and returns its text content.
   *
   * @async
   * @returns {Promise<string>} A promise that resolves to the error message text if it is displayed.
   */
  async getPasswordErrorMessage() {
    const errorMessageElement = await $('~Password-error-message');
    return await getTextOfElement(errorMessageElement); // Get the error message text
  }

  /**
   * Retrieves a generic error message displayed on the login screen.
   *
   * This method checks for any general error messages that might be displayed
   * and returns its text content.
   *
   * @async
   * @returns {Promise<string>} A promise that resolves to the generic error message text if it is displayed.
   */
  async getGenericErrorMessage() {
    const errorMessageElement = await $('~generic-error-message');
    return await getTextOfElement(errorMessageElement); // Get the generic error message text
  }

  /**
   * Checks if the login screen is currently displayed on the screen.
   *
   * This method returns a boolean indicating whether the login screen is visible,
   * allowing for validation of the screen's state.
   *
   * @async
   * @returns {Promise<boolean>} A promise that resolves to `true` if the login screen is displayed, otherwise `false`.
   */
  async isShown() {
    return await super.isShown(); // Utilize the inherited method from AppScreen
  }
}

export default new LoginScreen();
