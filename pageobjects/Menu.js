import AppScreen from './AppScreen';
import { getTextOfElement, locatorStrategy, findElementBySwipe } from '../helpers/utils';

/**
 * Represents the Menu screen of the application.
 * Extends AppScreen to inherit common functionalities.
 */
class Menu extends AppScreen {
  constructor() {
    super(locatorStrategy('menu item catalog'));
  }

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

    await this.confirmLogout();
  }

  /**
   * Opens the menu by clicking the open menu button.
   *
   * @async
   * @returns {Promise<void>} - A promise that resolves when the menu is opened.
   */
  async openMenu() {
    await this.openMenuButton.click();
  }
}

export default new Menu();
