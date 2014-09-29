'use strict';

var config = require('../config.js');
var bucket = require('./couchBucket.js')(config);


module.exports.ensureCreated = function(callback) {
    bucket.ensureCreated(callback);
};

module.exports.flush = function(callback) {
    bucket.flush(callback);
};

module.exports.delete = function(callback) {
    bucket.delete(callback);
};