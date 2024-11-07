
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

// Other existing utility functions here, e.g., openDeepLinkUrl, locatorStrategy, getTextOfElement, etc.
