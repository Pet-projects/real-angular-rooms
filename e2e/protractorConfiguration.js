var config = require('./config');

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'specs/*.js'
    ],

    seleniumAddress: 'http://localhost:9000',

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs'
    },

    chromeOnly: false,
    onPrepare: function () {
        browser.driver.manage().window().setSize(1600, 800);
    },

    baseUrl: config.frontend.address,
    framework: 'jasmine',


    allScriptsTimeout: 30000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};