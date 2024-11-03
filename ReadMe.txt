
Introduction:
   This Framework is created on to of Node.js using WebDriver IO module, Cucumber Framework, Sauce Lab service and JavaScript language.

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
   2. npm init -y
   3. npm install @wdio/cli webdriverio appium @wdio/sauce-service @wdio/local-runner @wdio/cucumber-framework @wdio/spec-reporter @cucumber/cucumber @wdio/chai-assertion

Step to run test suit on Sauce lab:

  1. Android Emulator Execution - In root of framework execute command => npx wdio ./config/wdio.conf.js and Verify Result in Automated/Test Results section in Sauce Lab.
  2. iOS Simulator Execution - In root of framework execute command => npx wdio ./config/wdio.ios.conf.js and Verify Result in Automated/Test Results section in Sauce Lab.
