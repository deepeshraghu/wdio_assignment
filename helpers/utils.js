/**
 * Restarts the application by terminating and then activating it again.
 *
 * This function retrieves the app's package name, terminates the app if it is running,
 * and then activates it again to simulate a restart.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the app has been restarted.
 */
export async function restartApp() {
    const appPackage = 'com.saucelabs.mydemoapp.rn'; // Define the package name of the app
    await driver.terminateApp(appPackage); // Terminate the app
    await driver.activateApp(appPackage); // Activate the app again
}

/**
 * Opens a deep link URL in the application.
 *
 * This function constructs a deep link URL using a predefined prefix and attempts to
 * open it within the application. The behavior differs between Android and iOS platforms.
 *
 * @param {string} url - The specific URL path to be opened as a deep link.
 * @async
 * @returns {Promise<void>} A promise that resolves when the deep link has been opened.
 */
export const openDeepLinkUrl = async (url) => {
  const prefix = 'mydemoapprn://'; // Define the prefix for the deep link

  if (driver.isAndroid) {
    // Android implementation for opening deep link
    return driver.execute('mobile:deepLink', {
      url: `${prefix}${url}`, // Construct the full deep link URL
      package: 'com.saucelabs.mydemoapp.rn', // Specify the app package
    });
  }
  else {
    // iOS implementation for opening deep link
    await driver.url(`${prefix}${url}`); // Navigate to the deep link URL

    const addressBarSelector =
      "name CONTAINS 'URL' OR name CONTAINS 'TabBarItemTitle' OR value contains 'Search or enter website name'";
    const urlFieldSelector =
      'type == "XCUIElementTypeTextField" && name CONTAINS "URL"';
    const addressBar = $(`-ios predicate string:${addressBarSelector}`); // Locate the address bar
    const urlField = $(`-ios predicate string:${urlFieldSelector}`); // Locate the URL input field

    if (!(await driver.isKeyboardShown())) {
      await addressBar.waitForDisplayed(); // Wait for the address bar to be displayed
      await addressBar.click(); // Click the address bar to focus it
    }

    await urlField.setValue(`${prefix}${url}\uE007`); // Enter the deep link URL and submit

  }


  // Handle the notification to open the link
  try {
    const openSelector =
      "type == 'XCUIElementTypeButton' && name CONTAINS 'Open'";
    const openButton = $(`-ios predicate string:${openSelector}`); // Locate the open button
    await openButton.waitForDisplayed({ timeout: 3000 }); // Wait for the button to be displayed
    await openButton.click(); // Click the open button
  } catch (e) {
    console.log('Deeplink error = ', e); // Log any errors encountered
  }
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
  return driver.isIOS ? `id=${selector}` : `//*[@content-desc="${selector}"]`; // Return platform-specific locator strategy
};

/**
 * Retrieves the visible text from a specified element.
 *
 * This function checks the element for text content. For Android, it retrieves
 * the text from all child TextView elements; for iOS, it retrieves the text directly
 * from the element. In case of an error, it attempts to get the text again.
 *
 * @param {WebdriverIO.Element} element - The element from which to retrieve the text.
 * @async
 * @returns {Promise<string>} A promise that resolves to the trimmed visible text of the element.
 */
export const getTextOfElement = async (element) => {
  let visualText = ''; // Initialize variable to store the visible text

  try {
    if (driver.isAndroid) {
      // For Android, gather text from all TextView elements
      const elements = await element.$$('//android.widget.TextView'); // Find all child TextView elements
      for (let elm of elements) {
        visualText = `${visualText} ${await elm.getText()}`; // Append each text to visualText
      }
    } else {
      // For iOS, get the text directly from the element
      visualText = await element.getText();
    }
  } catch (e) {
    visualText = await element.getText(); // Attempt to get text again if an error occurred
  }

  return visualText.trim(); // Return the trimmed text
};
