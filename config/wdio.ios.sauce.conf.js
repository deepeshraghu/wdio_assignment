exports.config = {
    runner: 'local',
    user: 'oauth-deepesh.raghuvanshi-379d1',
    key: '656d3bf5-013d-4110-94f8-824906844c4c',
    region: 'eu',

    specs: ['../features/**/*.feature'],
    maxInstances: 10,
    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 15 Simulator',
        'appium:platformVersion': '17.0',
        'appium:app': 'storage:filename=MyRNDemoApp.zip',
        'appium:automationName': 'XCUITest',
        'appium:launchTimeout': 60000
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['sauce'],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./step-definitions/steps.js'],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
};
