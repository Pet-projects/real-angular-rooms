exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'specs/*.js'
    ],

    capabilities: {
        'browserName': 'firefox'
    },

    chromeOnly: false,
    onPrepare: function () {
        browser.driver.manage().window().setSize(1600, 800);
    },


    baseUrl: 'http://localhost:3000/',

    framework: 'jasmine',


    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};