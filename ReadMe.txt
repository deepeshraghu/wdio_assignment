
Introduction:
   This Framework is created on to of Node.js using WebDriver IO module, Cucumber Framework, Sauce Lab service and JavaScript language.

Folder Structure:
   config => It contains wdio configuration .js file for Android and iOS execution on sauce lab.
   helpers => It contain below files:
                   1. e2eConstants.js => which store test data
                   2. gestures.js and utils.js => it contains reusable functions.
   pageobjects => It contains page classes for application pages where script will interact with components.
   step-definitions => It contains steps.js files which have implementation of feature file steps.
   feature => It contain feature file which have test cases defines in Gherkin language with GIVEN, WHEN, THEN format using cucumber.

Pre-Software Required:
   1. Node.js
   2. Intellij IDE
   3. git Installation on local.
   4. Sauce Lab account access.
   5. Download Sauce lab demo android application from https://github.com/saucelabs/my-demo-app-rn/releases/download/v1.3.0/Android-MyDemoAppRN.1.3.0.build-244.apk
    and rename file to Android.MyDemoAppRN.apk
   6. Login to Sauce lab and upload Android.MyDemoAppRN.apk file in App Management in android.
   6. Download Sauce lab demo iOS application fom https://github.com/saucelabs/my-demo-app-rn/releases/download/v1.3.0/iOS-Simulator-MyRNDemoApp.1.3.0-162.zip
    and rename file to MyRNDemoApp.zip
   7. Login to Sauce lab and upload MyRNDemoApp.zip file in App Management in iOS.

Step to Set Up this repo in Local:
   1. git clone https://github.com/deepeshraghu/wdio_assignment.git
   2. Update user and key details in "wdio.android.sauce.conf.js" and "wdio.ios.sauce.conf.js" file with valid credential from Sauce lab account.
   2. npm init -y
   3. npm install @wdio/cli webdriverio appium @wdio/sauce-service @wdio/local-runner @wdio/cucumber-framework @wdio/spec-reporter @cucumber/cucumber @wdio/chai-assertion

Step to run test suit on Sauce lab:

  1. Android Emulator Execution - In root of framework execute command => npm run test:android  and Verify Result in Automated/Test Results section in Sauce Lab.
  2. iOS Simulator Execution - In root of framework execute command => npm run test:ios and Verify Result in Automated/Test Results section in Sauce Lab.
