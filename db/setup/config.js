// This is a configuration file
var privateSetup = require('./private-config.js');
var config = privateSetup;

config.adminUser = 'Administrator';
//config.adminPassword = ''; - provided through private config
config.host = 'localhost';
config.adminPort = '8091';
config.designPort = '8092';
config.bucket = 'roomsbucket';
config.password = 'breakfast';

var ddoc = {
    "language" : "javascript",
    "views" : {
        "all" : {
            "map" :  "function (doc, meta) {\n  emit(meta.id, doc.name);\n}"
        }
    }
};

config.designDocument = {
    name: 'ddoc',
    content: JSON.stringify(ddoc)
};

module.exports = config;