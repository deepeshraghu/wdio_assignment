import AppScreen from './AppScreen';
import { getTextOfElement, locatorStrategy } from '../helpers/utils';
import { findElementBySwipe } from '../helpers/gestures';

const drawerContainerSelector = 'menu item catalog';

class Menu extends AppScreen {
  constructor() {
    super(locatorStrategy(drawerContainerSelector));
  }

  get drawerContainer() {
    return $(locatorStrategy(drawerContainerSelector));
  }

  get openMenuButton() {
    return $(locatorStrategy(driver.isIOS ? 'tab bar option menu' : 'open menu'));
  }

  get webviewButton() {
    return $(locatorStrategy('menu item webview'));
  }

  get drawingButton() {
    return $(locatorStrategy('menu item drawing'));
  }

  get resetAppButton() {
    return $(locatorStrategy('menu item reset app'));
  }

  get loginButton() {
    return $(locatorStrategy('menu item log in'));
  }

  get logOutButton() {
    return $(locatorStrategy('menu item log out'));
  }


  async openCatalog() {
    await this.catalogButton.click();
  }

  async openResetApp() {
    await (
      await findElementBySwipe({
        element: await this.resetAppButton,
        scrollableElement: await this.drawerContainer,
      })
    )?.click();
  }

  async openLogin() {
    await (
      await findElementBySwipe({
        element: await this.loginButton,
        scrollableElement: await this.drawerContainer,
      })
    )?.click();
  }

  async logout() {
    await (
      await findElementBySwipe({
        element: await this.logOutButton,
        scrollableElement: await this.drawerContainer,
      })
    )?.click();

    const iosSelector = (text) => `-ios class chain:**/XCUIElementTypeButton[\`label == "${text}"\`]`;
    const androidSelector = (text) => `//android.widget.Button[contains(@text,'${text}')]`;

    await $(driver.isIOS ? iosSelector('Log Out') : androidSelector('LOG OUT')).waitForDisplayed();
    await $(driver.isIOS ? iosSelector('Log Out') : androidSelector('LOG OUT')).click();
    await $(driver.isIOS ? iosSelector('OK') : androidSelector('OK')).waitForDisplayed();
    await $(driver.isIOS ? iosSelector('OK') : androidSelector('OK')).click();

    // Wait for animation to be done
    await driver.pause(750);
  }

  async openMenu() {
    await this.openMenuButton.click();

    // Wait for animation to be done
    await driver.pause(750);
  }

  async closeMenu() {
    await this.closeMenuButton.click();

    // Wait for animation to be done
    await driver.pause(750);
  }

}

export default new Menu();
