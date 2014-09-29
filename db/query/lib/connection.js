'use strict';

var dbConfig = require('../config.js');
var couchbase = require('couchbase');

module.exports = new couchbase.Connection(dbConfig, function(err) {
    if (err) {
        console.error("Failed to connect to cluster: " + err);
        process.exit(1);
    }

    console.log('Couchbase Connected');
});