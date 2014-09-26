'use strict';

var config = require('../config.js');
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