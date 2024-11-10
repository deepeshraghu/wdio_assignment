
/**
 * Attempts to find a specified element by swiping within a scrollable container.
 *
 * This function performs a series of swipe gestures to locate an element within
 * a specified scrollable container. It will swipe up or down depending on the
 * value of the `scrollUp` parameter. The maximum number of scroll attempts can
 * be controlled with the `maxScrolls` parameter.
 *
 * @param {Object} params - The parameters for finding the element.
 * @param {WebdriverIO.Element} params.element - The element to locate within the scrollable area.
 * @param {number} [params.maxScrolls=5] - The maximum number of scroll attempts before giving up.
 * @param {WebdriverIO.Element} params.scrollableElement - The container element that is scrollable.
 * @param {boolean} [params.scrollUp=false] - A flag indicating whether to swipe up (true) or down (false).
 * @async
 * @returns {Promise<WebdriverIO.Element|undefined>} A promise that resolves to the located element or undefined if not found.
 */
export const findElementBySwipe = async ({
  element,
  maxScrolls = 5,
  scrollableElement,
  scrollUp = false,
}) => {
  for (let i = 0; i < maxScrolls; i++) {
    if (await element.isDisplayed()) {
      return element;
    }

    const { x, y, height, width } = await driver.getElementRect(scrollableElement.elementId);
    const centerX = x + width / 2;
    const yStart = y + height * 0.9;
    const yEnd = y + height * 0.1;

    if (scrollUp) {
      await swipe({ x: centerX, y: yEnd }, { x: centerX, y: yStart });
    } else {
      await swipe({ x: centerX, y: yStart }, { x: centerX, y: yEnd });
    }
  }
};

/**
 * Restarts the application by terminating and then activating it again.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the app has been restarted.
 */
export async function restartApp() {
    const appPackage = 'com.saucelabs.mydemoapp.rn';
    await driver.terminateApp(appPackage);
    await driver.activateApp(appPackage);
}


/**
 * Opens a deep link URL within the application.
 *
 * This function constructs a deep link using a predefined prefix and opens it within the app.
 * The method uses the WebDriverIO `execute` command with `mobile:deepLink`, which allows
 * deep linking directly into mobile applications, typically used in mobile testing environments.
 *
 * @param {string} url - The specific path or route within the app to be appended to the base deep link URL.
 * @async
 * @returns {Promise<void>} A promise that resolves when the deep link action is completed.
 */
export const openDeepLinkUrl = async (url) => {
  const prefix = 'mydemoapprn://';
  const fullUrl = `${prefix}${url}`;
  return driver.execute('mobile:deepLink', {
    url: fullUrl, // Use the constructed URL
    package: 'com.saucelabs.mydemoapp.rn',
  });
};



/**
 * Returns the appropriate locator strategy based on the platform (iOS or Android).
 *
 * This function provides a strategy for locating elements based on the platform
 * by returning either an ID strategy for iOS or a content description strategy for Android.
 *
 * @param {string} selector - The selector string to be used for locating the element.
 * @returns {string} The locator strategy string for the respective platform.
 */
export const locatorStrategy = (selector) => {
  return driver.isIOS ? `id=${selector}` : `//*[@content-desc="${selector}"]`;
};