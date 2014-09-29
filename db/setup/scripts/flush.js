'use strict';

var bucket = require('../lib/couchPublic.js');

bucket.flush(function () {
    console.log("Bucket has been flushed !");
});
