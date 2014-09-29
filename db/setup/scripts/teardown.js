'use strict';

var bucket = require('../lib/couchPublic.js');

bucket.delete(function () {
    console.log("Bucket has been deleted !");
});
