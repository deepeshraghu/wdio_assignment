// test/steps/login.steps.js
import { openDeepLinkUrl, restartApp } from '../helpers/utils';
import CatalogScreen from '../pageObjects/CatalogScreen';
import Menu from '../pageObjects/Menu';
import LoginScreen from '../pageObjects/LoginScreen';
import { LOGIN_USERS } from '../helpers/e2eConstants';
import CheckoutAddressScreen from '../pageObjects/CheckoutAddressScreen';
import { expect } from 'chai';
import { Given, When, Then } from '@wdio/cucumber-framework';


Given('the app is restarted', async () => {
  await restartApp();
});

Given('I am on the catalog screen', async () => {
  await CatalogScreen.waitForIsShown();
});

When('I navigate to the login screen', async () => {
  await openDeepLinkUrl('login');
  await LoginScreen.waitForIsShown();
});

When('I login with valid credentials', async () => {
  await LoginScreen.submitLogin(LOGIN_USERS.STANDARD);
  await CheckoutAddressScreen.waitForIsShown();
});

When('I login through autofill', async () => {
  await LoginScreen.submitLoginWithAutofill(true);
  await CheckoutAddressScreen.waitForIsShown();
});

When('I logout', async () => {
  await Menu.openMenu();
  await Menu.logout();
});

When('I login without username', async () => {
  await LoginScreen.submitLogin(LOGIN_USERS.NO_USER_DETAILS);
});

When('I login without password', async () => {
  await LoginScreen.submitLogin(LOGIN_USERS.NO_PASSWORD);
});

When('I login with invalid credentials', async () => {
  await LoginScreen.submitLogin(LOGIN_USERS.NO_MATCH);
});

When('I login with locked out credentials', async () => {
  await LoginScreen.submitLogin(LOGIN_USERS.LOCKED);
});

Then('I should see the checkout address screen', async () => {
  expect(await CheckoutAddressScreen.isShown()).to.be.true;
});

Then('I should see the login screen', async () => {
  await LoginScreen.waitForIsShown();
  expect(await LoginScreen.isShown()).to.be.true;
});

Then('I should see the error message {string} for username', async (errorMessage) => {
  const actualMessage = await LoginScreen.getUsernameErrorMessage();
  expect(actualMessage).to.equal(errorMessage);
});

Then('I should see the error message {string} for password', async (errorMessage) => {
  const actualMessage = await LoginScreen.getPasswordErrorMessage();
  expect(actualMessage).to.equal(errorMessage);
});

Then('I should see the error message {string}', async (errorMessage) => {
  const actualMessage = await LoginScreen.getGenericErrorMessage();
  expect(actualMessage).to.equal(errorMessage);
});
