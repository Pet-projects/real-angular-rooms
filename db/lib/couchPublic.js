'use strict';

var config = require('../config.js');
var couchbase = require('couchbase');
var bucket = require('./couchBucket.js')(config);


module.exports.ensureCreated = function() {
    bucket.ensureCreated();
};

module.exports.flush = function() {
    bucket.flush();
};

module.exports.delete = function() {
    bucket.delete();
};

var dbConfig = {
    host: [config.host],
    bucket: config.bucket,
    password: config.password
};
module.exports.connect = function() {
    return new couchbase.Connection(dbConfig, function(err) {
        if (err) {
            console.error("Failed to connect to cluster: " + err);
            process.exit(1);
        }

        console.log('Couchbase Connected');
    });
};