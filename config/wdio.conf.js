exports.config = {

    runner: 'local',

    user: 'oauth-deepesh.raghuvanshi-6eb14',
    key: 'bb85f856-bcec-46a3-8549-5cda26dfbae8',
    region: 'eu',

    specs: [
        './features/**/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    capabilities: [{
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android',
        'appium:deviceName': 'Android GoogleAPI Emulator',
        'appium:platformVersion': '12.0',
        'appium:app': 'storage:filename=Android.MyDemoAppRN.apk',
        'appium:appPackage': 'com.saucelabs.mydemoapp.rn',
        'appium:automationName': 'UiAutomator2'
    }],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['sauce'],
    framework: 'cucumber',

    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./features/step-definitions/steps.js'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> Only execute the scenarios with name matching the expression (repeatable).
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

}
