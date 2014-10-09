// This is a configuration file
var extend = require('node.extend');
var privateSetup = require('./private-config.js');
var mainConfig = {};

mainConfig.adminUser = 'Administrator';
//config.adminPassword = ''; - provided through private config
mainConfig.host = 'localhost';
mainConfig.adminPort = '8091';
mainConfig.designPort = '8092';
mainConfig.bucket = 'roomsbucket';
mainConfig.password = 'breakfast';

var roomView = {
    "language" : "javascript",
    "views" : {
        "all" : {
            "map" :  "function (doc, meta) { \n if (doc.type == 'room') { \n emit(doc.id); \n } \n 	}"
        }
    }
};

var userView = {
    "language" : "javascript",
    "views" : {
        "all" : {
            "map" :  "function (doc, meta) { \n if (doc.type == 'user') { \n emit(doc.id); \n } \n 	}"
        }
    }
};

mainConfig.designDocuments = [
	{
	    name: 'roomView',
	    content: JSON.stringify(roomView)
	},
	{
	    name: 'userView',
	    content: JSON.stringify(userView)
	}];

var config = extend(true, mainConfig, privateSetup);

module.exports = config;