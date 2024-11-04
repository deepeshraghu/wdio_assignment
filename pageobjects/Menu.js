import AppScreen from './AppScreen';
import { getTextOfElement, locatorStrategy } from '../helpers/utils';
import { findElementBySwipe } from '../helpers/gestures';

const drawerContainerSelector = 'menu item catalog';

class Menu extends AppScreen {
  constructor() {
    super(locatorStrategy(drawerContainerSelector)); // Call the parent constructor with the drawer container locator
  }

  /**
   * Gets the drawer container element.
   *
   * @returns {WebdriverIO.Element} The element representing the drawer container.
   */
  get drawerContainer() {
    return $(locatorStrategy(drawerContainerSelector));
  }

  /**
   * Gets the open menu button element.
   *
   * @returns {WebdriverIO.Element} The element representing the open menu button.
   */
   get openMenuButton() {
    return $(locatorStrategy(driver.isIOS ? 'tab bar option menu' : 'open menu'));
  }

  /**
   * Gets the webview button element.
   *
   * @returns {WebdriverIO.Element} The element representing the webview button.
   */
  get webviewButton() {
    return $(locatorStrategy('menu item webview'));
  }

  /**
   * Gets the drawing button element.
   *
   * @returns {WebdriverIO.Element} The element representing the drawing button.
   */
  get drawingButton() {
    return $(locatorStrategy('menu item drawing'));
  }

  /**
   * Gets the reset app button element.
   *
   * @returns {WebdriverIO.Element} The element representing the reset app button.
   */
  get resetAppButton() {
    return $(locatorStrategy('menu item reset app'));
  }

  /**
   * Gets the login button element.
   *
   * @returns {WebdriverIO.Element} The element representing the login button.
   */
  get loginButton() {
    return $(locatorStrategy('menu item log in'));
  }

  /**
   * Gets the logout button element.
   *
   * @returns {WebdriverIO.Element} The element representing the logout button.
   */
  get logOutButton() {
    return $(locatorStrategy('menu item log out'));
  }

  /**
   * Opens the catalog by clicking the catalog button.
   *
   * This method clicks on the catalog button to navigate to the catalog screen.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the catalog is opened.
   */
  async openCatalog() {
    await this.catalogButton.click(); // Click the catalog button
  }

  /**
   * Opens the reset app menu by swiping to find the reset app button and clicking it.
   *
   * This method uses swipe gestures to find the reset app button and then clicks it to initiate the reset process.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the reset app action is initiated.
   */
  async openResetApp() {
    await (
      await findElementBySwipe({
        element: await this.resetAppButton,
        scrollableElement: await this.drawerContainer,
      })
    )?.click(); // Click the reset app button after swiping
  }

  /**
   * Opens the login screen by swiping to find the login button and clicking it.
   *
   * This method uses swipe gestures to locate the login button within the drawer container and then clicks it to navigate to the login screen.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the login screen is opened.
   */
  async openLogin() {
    await (
      await findElementBySwipe({
        element: await this.loginButton,
        scrollableElement: await this.drawerContainer,
      })
    )?.click(); // Click the login button after swiping
  }

  /**
   * Logs out the user by clicking the logout button and confirming the action.
   *
   * This method swipes to find the logout button, clicks it, and then confirms the logout by clicking the appropriate buttons on the confirmation dialog.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the logout process is complete.
   */
  async logout() {
    await (
      await findElementBySwipe({
        element: await this.logOutButton,
        scrollableElement: await this.drawerContainer,
      })
    )?.click(); // Click the logout button after swiping

    const iosSelector = (text) => `-ios class chain:**/XCUIElementTypeButton[\`label == "${text}"\`]`;
    const androidSelector = (text) => `//android.widget.Button[contains(@text,'${text}')]`;

    await $(driver.isIOS ? iosSelector('Log Out') : androidSelector('LOG OUT')).waitForDisplayed(); // Wait for the log out confirmation button to be displayed
    await $(driver.isIOS ? iosSelector('Log Out') : androidSelector('LOG OUT')).click(); // Click the log out confirmation button
    await $(driver.isIOS ? iosSelector('OK') : androidSelector('OK')).waitForDisplayed(); // Wait for the OK confirmation button to be displayed
    await $(driver.isIOS ? iosSelector('OK') : androidSelector('OK')).click(); // Click the OK confirmation button

    await driver.pause(750); // Pause briefly to allow the logout animation to complete
  }

  /**
   * Opens the menu by clicking the open menu button.
   *
   * This method clicks the button to reveal the menu options.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the menu is opened.
   */
  async openMenu() {
    await this.openMenuButton.click(); // Click the open menu button
    await driver.pause(750); // Pause briefly to allow the menu to open
  }

  /**
   * Closes the menu by clicking the close menu button.
   *
   * This method clicks the button to hide the menu options.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the menu is closed.
   */
  async closeMenu() {
    await this.closeMenuButton.click(); // Click the close menu button
    await driver.pause(750); // Pause briefly to allow the menu to close
  }
}

export default new Menu();
