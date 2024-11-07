/**
 * Performs a swipe gesture on the screen from a starting point to an ending point.
 *
 * This function simulates a touch swipe gesture using the specified coordinates for
 * the starting and ending points. It uses the WebDriver's performActions API to execute
 * the pointer actions necessary for the swipe.
 *
 * @param {Object} from - The starting coordinates of the swipe.
 * @param {number} from.x - The x-coordinate of the starting point.
 * @param {number} from.y - The y-coordinate of the starting point.
 * @param {Object} to - The ending coordinates of the swipe.
 * @param {number} to.x - The x-coordinate of the ending point.
 * @param {number} to.y - The y-coordinate of the ending point.
 * @async
 * @returns {Promise<void>} A promise that resolves when the swipe action is completed.
 */
export const swipe = async (from, to) => {
  await driver.performActions([
    {
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration: 1000, x: to.x, y: to.y },
        { type: 'pointerUp', button: 0 },
      ],
    },
  ]);
  await driver.pause(2000);
};

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
