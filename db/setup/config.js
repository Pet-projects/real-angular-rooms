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

var ddoc = {
    "language" : "javascript",
    "views" : {
        "all" : {
            "map" :  "function (doc, meta) {\n  emit(meta.id, doc.name);\n}"
        }
    }
};

mainConfig.designDocument = {
    name: 'ddoc',
    content: JSON.stringify(ddoc)
};

var config = extend(true, mainConfig, privateSetup);

module.exports = config;