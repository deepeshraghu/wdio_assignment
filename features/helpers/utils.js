// helpers/utils.js

export async function restartApp() {
    const appPackage = 'com.saucelabs.mydemoapp.rn'; // Update with your app's package name
    await driver.terminateApp(appPackage);
    await driver.activateApp(appPackage);
}

const openDeepLinkUrl = async (url) => {
  const prefix = 'mydemoapprn://';

  if (driver.isAndroid) {
    // Android implementation
    return driver.execute('mobile:deepLink', {
      url: `${prefix}${url}`,
      package: 'com.saucelabs.mydemoapp.rn',
    });
  } else {
    await driver.url(`${prefix}${url}`);

    const addressBarSelector =
      "name CONTAINS 'URL' OR name CONTAINS 'TabBarItemTitle' OR value contains 'Search or enter website name'";
    const urlFieldSelector =
      'type == "XCUIElementTypeTextField" && name CONTAINS "URL"';
    const addressBar = $(`-ios predicate string:${addressBarSelector}`);
    const urlField = $(`-ios predicate string:${urlFieldSelector}`);

    if (!(await driver.isKeyboardShown())) {
      await addressBar.waitForDisplayed();
      await addressBar.click();
    }

    await urlField.setValue(`${prefix}${url}\uE007`);
  }

  // Handle the notification to open the link
  try {
    const openSelector =
      "type == 'XCUIElementTypeButton' && name CONTAINS 'Open'";
    const openButton = $(`-ios predicate string:${openSelector}`);
    await openButton.waitForDisplayed({ timeout: 3000 });
    await openButton.click();
  } catch (e) {
    console.log('Deeplink error = ', e);
  }
};

export const locatorStrategy = (selector) => {
  return driver.isIOS ? `id=${selector}` : `//*[@content-desc="${selector}"]`;
};

export const getTextOfElement = async (element) => {
  let visualText = '';

  try {
    // Android doesn't hold the text on the parent element
    // so each text view in the parent needs to be checked
    if (driver.isAndroid) {
      const elements = await element.$$('//android.widget.TextView');
      for (let elm of elements) {
        visualText = `${visualText} ${await elm.getText()}`;
      }
    } else {
      visualText = await element.getText();
    }
  } catch (e) {
    visualText = await element.getText();
  }

  return visualText.trim();
};
