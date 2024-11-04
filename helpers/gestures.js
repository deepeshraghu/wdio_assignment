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
const swipe = async (from, to) => {
  await driver.performActions([ // Initiate the swipe action
    {
      type: 'pointer', // Define the type of action
      id: 'finger1', // Unique identifier for the pointer
      parameters: { pointerType: 'touch' }, // Specify the pointer type as touch
      actions: [
        { type: 'pointerMove', duration: 0, x: from.x, y: from.y }, // Move finger to start position
        { type: 'pointerDown', button: 0 }, // Press down on the screen
        { type: 'pause', duration: 100 }, // Pause for a brief moment
        { type: 'pointerMove', duration: 1000, x: to.x, y: to.y }, // Move finger to end position
        { type: 'pointerUp', button: 0 }, // Release the finger off the screen
      ],
    },
  ]);
  await driver.pause(2000); // Wait for a short period after the swipe
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
const findElementBySwipe = async ({
  element,
  maxScrolls = 5,
  scrollableElement,
  scrollUp = false,
}) => {
  for (let i = 0; i < maxScrolls; i++) { // Attempt to find the element up to maxScrolls times
    if (await element.isDisplayed()) { // Check if the element is currently displayed
      return element; // Return the element if found
    }

    // Get the rectangle dimensions of the scrollable element
    const { x, y, height, width } = await driver.getElementRect(scrollableElement.elementId);
    const centerX = x + width / 2; // Calculate the center x-coordinate
    const yStart = y + height * 0.9; // Starting y-coordinate for swipe
    const yEnd = y + height * 0.1; // Ending y-coordinate for swipe

    // Perform the swipe action based on the scroll direction
    if (scrollUp) {
      await swipe({ x: centerX, y: yEnd }, { x: centerX, y: yStart }); // Swipe up
    } else {
      await swipe({ x: centerX, y: yStart }, { x: centerX, y: yEnd }); // Swipe down
    }
  }
};

export { findElementBySwipe, swipe };
