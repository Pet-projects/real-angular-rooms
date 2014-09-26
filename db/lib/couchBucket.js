'use strict';

var request = require('request-promise');

function CouchBucket(config) {
    this.bucketActions = {};

    this.bucketActions.retrieve = {
        auth: { 'user': config.adminUser, 'pass': config.adminPassword },
        method: 'GET',
        uri: 'http://' + config.url + '/pools/default/buckets/' + config.bucket
    };

    this.bucketActions.delete = {
        auth: { 'user': config.adminUser, 'pass': config.adminPassword },
        method: 'DELETE',
        uri: 'http://' + config.url + '/pools/default/buckets/' + config.bucket
    };

    this.bucketActions.create = {
        auth: { 'user': config.adminUser, 'pass': config.adminPassword },
        method: 'POST',
        form: {
            name: config.bucket,
            ramQuotaMB: 100,
            authType: "sasl",
            saslPassword: config.password,
            replicaNumber: 0,
            flushEnabled: 1
        },
        uri: 'http://' + config.url + '/pools/default/buckets'
    };

    this.bucketActions.update = {
        auth: { 'user': config.adminUser, 'pass': config.adminPassword },
        method: 'POST',
        form: {
            name: config.bucket,
            ramQuotaMB: 100,
            authType: "sasl",
            saslPassword: config.password,
            replicaNumber: 0,
            flushEnabled: 1
        },
        uri: 'http://' + config.url + '/pools/default/buckets/' + config.bucket
    };

    this.bucketActions.flush = {
        auth: { 'user': config.adminUser, 'pass': config.adminPassword },
        method: 'POST',
        form: { },
        uri: 'http://' + config.url + '/pools/default/buckets/' + config.bucket + '/controller/doFlush'
    };
}

CouchBucket.prototype.ensureCreated = function() {
    var bucket = this.bucketActions;
    var _action = bucket.retrieve;

    console.log('Making request: ' + _action.method + ' ' + _action.uri);
    request(_action)
        .then(createRequest(bucket.update))
        .catch(createRequest(bucket.create));
};

CouchBucket.prototype.create = function() {
    var _request = createRequest(this.bucketActions.create);
    _request();
};

CouchBucket.prototype.update = function() {
    var _request = createRequest(this.bucketActions.update);
    _request();
};

CouchBucket.prototype.purge = function() {
    var _request = createRequest(this.bucketActions.flush);
    _request();
};

CouchBucket.prototype.delete = function() {
    var _request = createRequest(this.bucketActions.delete);
    _request();
};

//Private use

function createRequest(action) {
    var _action = action;

    return function() {
        console.log('Making request: ' + _action.method + ' ' + _action.uri);
        request(_action)
            .catch(handleError);
    }
}

function handleError(error) {
    console.log("Error. Status code is: " + error.statusCode);
    console.log(error.options.method + ' ' + error.options.uri);
    console.log(error.response.body);
};

// Export

module.exports=function(config) {
    return new CouchBucket(config);
};