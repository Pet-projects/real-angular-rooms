// This is a configuration file
var privateSetup = require('./private-config.js');
var config = privateSetup;

config.adminUser = 'Administrator';
//config.adminPassword = ''; - provided through private config
config.url = 'localhost:8091';
config.bucket = 'roomsbucket';
config.password = 'breakfast';

module.exports = config;