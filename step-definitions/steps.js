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
  await restartApp(); // Resets the app session
});

// Step to verify the user is on the catalog screen
Given('I am on the catalog screen', async () => {
  await CatalogScreen.waitForIsShown(); // Waits for the catalog screen to be displayed
});

// Step to navigate to the login screen using a deep link
When('I navigate to the login screen', async () => {
  if(driver.isAndroid){
  await openDeepLinkUrl('login'); // Opens the login screen via a deep link URL
  }
  else{
   await Menu.openMenu(); // Opens the menu
   await Menu.openLogin();   //Click on LogIn
  }
  await LoginScreen.waitForIsShown(); // Waits for the login screen to be visible
});

// Step to log in with valid credentials
When('I login with valid credentials', async () => {
  await LoginScreen.submitLogin(LOGIN_USERS.STANDARD); // Submits login with standard valid user
  await CheckoutAddressScreen.waitForIsShown(); // Waits for the checkout address screen to show after login
});

// Step to log in using autofill credentials
When('I login through autofill', async () => {
  await LoginScreen.submitLoginWithAutofill(true); // Uses autofill to log in
  await CheckoutAddressScreen.waitForIsShown(); // Waits for the checkout address screen to confirm successful login
});

// Step to log out of the application
When('I logout', async () => {
  await Menu.openMenu(); // Opens the menu
  await Menu.logout(); // Selects the logout option
});

// Step to verify the checkout address screen is displayed
Then('I should see the checkout address screen', async () => {
  expect(await CheckoutAddressScreen.isShown()).to.be.true; // Asserts the checkout address screen is displayed
});

// Step to verify the login screen is displayed after logout or navigation
Then('I should see the login screen', async () => {
  await LoginScreen.waitForIsShown(); // Waits for the login screen to appear
  expect(await LoginScreen.isShown()).to.be.true; // Asserts the login screen is visible
});

// Step to handle various login scenarios based on username and password input
When(/^I login with (.+) and (.+)$/, async (username, password) => {
  // Handles specific cases based on the given username and password values
  if (username === "NO_USER_DETAILS") {
    await LoginScreen.submitLogin(LOGIN_USERS.NO_USER_DETAILS); // Login without username
  } else if (password === "NO_PASSWORD") {
    await LoginScreen.submitLogin(LOGIN_USERS.NO_PASSWORD); // Login without password
  } else if (username === "invalidUser") {
    await LoginScreen.submitLogin(LOGIN_USERS.NO_MATCH); // Login with invalid credentials
  } else if (username === "lockedUser") {
    await LoginScreen.submitLogin(LOGIN_USERS.LOCKED); // Login with locked-out user credentials
  } else {
    // Generic login with provided username and password for other cases
    await LoginScreen.enterUsername(username); // Enters the specified username
    await LoginScreen.enterPassword(password); // Enters the specified password
    await LoginScreen.submitLogin(); // Submits login with the provided credentials
  }
});

// Step to verify that the correct error message is displayed for a specified field
Then(/^I should see the error message "([^"]+)" for "([^"]+)"$/, async (errorMessage, field) => {
  let actualMessage;

  // Selects the error message based on the field: username, password, or a generic message
  switch (field) {
    case 'username':
      actualMessage = await LoginScreen.getUsernameErrorMessage(); // Gets the username error message
      break;
    case 'password':
      actualMessage = await LoginScreen.getPasswordErrorMessage(); // Gets the password error message
      break;
    default:
      actualMessage = await LoginScreen.getGenericErrorMessage(); // Gets a general error message
  }

  // Asserts that the actual error message matches the expected message
  expect(actualMessage).to.equal(errorMessage);
});
