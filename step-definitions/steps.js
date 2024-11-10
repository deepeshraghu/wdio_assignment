import { openDeepLinkUrl, restartApp } from '../helpers/utils';
import CatalogScreen from '../pageObjects/CatalogScreen';
import Menu from '../pageObjects/Menu';
import LoginScreen from '../pageObjects/LoginScreen';
import { LOGIN_USERS } from '../helpers/e2eConstants';
import CheckoutAddressScreen from '../pageObjects/CheckoutAddressScreen';
import { expect } from 'chai';
import { Given, When, Then } from '@wdio/cucumber-framework';

// Step to restart the app before starting a test
Given('the app is restarted', async () => {
  await restartApp();
});

// Step to verify the user is on the catalog screen
Given('I am on the catalog screen', async () => {
  await CatalogScreen.waitForIsShown();
});

// Step to navigate to the login screen using a deep link
When('I navigate to the login screen', async () => {
  if (driver.isAndroid) {
    await openDeepLinkUrl('login');
  } else {
    await Menu.openMenu();
    await Menu.openLogin();
  }

});

// Step to log in with valid credentials
When('I login with valid credentials', async () => {
  await LoginScreen.submitLogin(LOGIN_USERS.STANDARD);
  await CheckoutAddressScreen.waitForIsShown();
});


// Step to log out of the application
When('I logout', async () => {
  await Menu.openMenu();
  await Menu.logout();
});

// Step to verify the checkout address screen is displayed
Then('I should see the checkout address screen', async () => {
  expect(await CheckoutAddressScreen.isShown()).to.be.true;
});


// Step to handle various login scenarios based on username and password input
When(/^I login with (.+) and (.+)$/, async (username, password) => {
  switch (true) {
    case username === 'NO_USER_DETAILS':
      await LoginScreen.submitLogin(LOGIN_USERS.NO_USER_DETAILS);
      break;
    case password === 'NO_PASSWORD':
      await LoginScreen.submitLogin(LOGIN_USERS.NO_PASSWORD);
      break;
    case username === 'invalidUser':
      await LoginScreen.submitLogin(LOGIN_USERS.NO_MATCH);
      break;
    case username === 'lockedUser':
      await LoginScreen.submitLogin(LOGIN_USERS.LOCKED);
      break;
    default:
      await LoginScreen.enterUsername(username);
      await LoginScreen.enterPassword(password);
      await LoginScreen.submitLogin();
  }
});

// Step to verify that the correct error message is displayed for a specified field
Then(/^I should see the error message "([^"]+)" for "([^"]+)"$/, async (errorMessage, field) => {
  const actualMessage = await (field === 'username'
    ? LoginScreen.getUsernameErrorMessage()
    : field === 'password'
    ? LoginScreen.getPasswordErrorMessage()
    : LoginScreen.getGenericErrorMessage());

  expect(actualMessage).to.equal(errorMessage);
});
