exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'specs/*.js'
  ],

  baseUrl: 'http://localhost:3000/',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};