import AppScreen from './AppScreen';
import { getTextOfElement, locatorStrategy } from '../helpers/utils';
import { findElementBySwipe } from '../helpers/gestures';

/**
 * Represents the Menu screen of the application.
 * Extends AppScreen to inherit common functionalities.
 */
class Menu extends AppScreen {
  constructor() {
    super(locatorStrategy('menu item catalog')); // Initialize with drawer container locator
  }

  // Locators
  get drawerContainer() {
    return $(locatorStrategy('menu item catalog'));
  }

  get openMenuButton() {
    return $(locatorStrategy(driver.isIOS ? 'tab bar option menu' : 'open menu'));
  }

  get loginButton() {
    return $(locatorStrategy('menu item log in'));
  }

  get logOutButton() {
    return $(locatorStrategy('menu item log out'));
  }

  /**
   * Opens the login screen by swiping to locate the login button.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the login screen is opened.
   */
  async openLogin() {
    await (await findElementBySwipe({
      element: await this.loginButton,
      scrollableElement: await this.drawerContainer,
    }))?.click();
  }

  /**
   * Logs out the user by clicking the logout button and confirming the action.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
   */
  async logout() {
    await (await findElementBySwipe({
      element: await this.logOutButton,
      scrollableElement: await this.drawerContainer,
    }))?.click();

    await this.confirmLogout(); // Call helper method to confirm logout
  }

  /**
   * Helper function to confirm logout on both iOS and Android.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the confirmation process is complete.
   */
  async confirmLogout() {
    const iosSelector = (text) => `-ios class chain:**/XCUIElementTypeButton[\`label == "${text}"\`]`;
    const androidSelector = (text) => `//android.widget.Button[contains(@text,'${text}')]`;

    const logOutButton = $(driver.isIOS ? iosSelector('Log Out') : androidSelector('LOG OUT'));
    const okButton = $(driver.isIOS ? iosSelector('OK') : androidSelector('OK'));

    await logOutButton.waitForDisplayed();
    await logOutButton.click();

    await okButton.waitForDisplayed();
    await okButton.click();

    await driver.pause(750); // Brief pause for logout animation
  }

  /**
   * Opens the menu by clicking the open menu button.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the menu is opened.
   */
  async openMenu() {
    await this.openMenuButton.click();
    await driver.pause(750); // Brief pause to allow the menu to open
  }
}

export default new Menu();
