exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'specs/*.js'
    ],

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs'
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