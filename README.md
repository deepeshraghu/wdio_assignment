
# WebDriverIO Cucumber Framework

## Introduction

This framework is built on top of Node.js using the WebDriverIO module, Cucumber framework, Sauce Labs service, and JavaScript. It provides a structured approach for executing automated tests on Android and iOS platforms via Sauce Labs.

## Folder Structure

- **config**  
  Contains WebDriverIO configuration files for Android and iOS execution on Sauce Labs.

- **helpers**  
  Contains utility files:
    - `e2eConstants.js` - Stores test data.
    - `gestures.js` and `utils.js` - Contains reusable functions.

- **pageobjects**  
  Contains page classes for application pages, where scripts interact with UI components.

- **step-definitions**  
  Contains step definition files (`steps.js`) which implement the feature file steps.

- **feature**  
  Contains feature files defining test cases in Gherkin syntax (`GIVEN`, `WHEN`, `THEN`), using the Cucumber framework.

## Prerequisites

1. **Node.js** - Required for running the framework.
2. **IntelliJ IDEA** - Recommended IDE for development.
3. **Git** - For cloning and version control.
4. **Sauce Labs account** - Required for running tests on the Sauce Labs platform.
5. **Download the Sauce Labs demo applications**:
    - **Android**  
      Download the demo Android app from [here](https://github.com/saucelabs/my-demo-app-rn/releases/download/v1.3.0/Android-MyDemoAppRN.1.3.0.build-244.apk), rename it to `Android.MyDemoAppRN.apk`, and upload it to Sauce Labs under App Management (Android).
    - **iOS**  
      Download the demo iOS app from [here](https://github.com/saucelabs/my-demo-app-rn/releases/download/v1.3.0/iOS-Simulator-MyRNDemoApp.1.3.0-162.zip), rename it to `MyRNDemoApp.zip`, and upload it to Sauce Labs under App Management (iOS).

## Setup

To set up this repository on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/deepeshraghu/wdio_assignment.git
   ```
2. Update Sauce Labs credentials in the `wdio.android.sauce.conf.js` and `wdio.ios.sauce.conf.js` files.
3. Initialize the project:
   ```bash
   npm init -y
   ```
4. Install dependencies:
   ```bash
   npm install @wdio/cli webdriverio appium @wdio/sauce-service @wdio/local-runner @wdio/cucumber-framework @wdio/spec-reporter @cucumber/cucumber @wdio/chai-assertion
   ```

## Running Tests on Sauce Labs

1. **Android Emulator Execution**  
   Run the following command from the root of the framework:
   ```bash
   npm run test:android
   ```
   Check results in the **Automated/Test Results** section in Sauce Labs.

2. **iOS Simulator Execution**  
   Run the following command from the root of the framework:
   ```bash
   npm run test:ios
   ```
   Verify the results in the **Automated/Test Results** section in Sauce Labs.

---
