'use strict';

var request = require('request-promise');

function AbstractCouchAction(config) {
    this.auth = { 'user': config.adminUser, 'pass': config.adminPassword };
    this.method = 'GET';
    this.baseuri = 'http://' + config.url + '/pools/default/buckets';
}

function actionRetrieve(config) {
    var action = new AbstractCouchAction(config);
    action.method = 'GET';
    action.uri = action.baseuri + '/' + config.bucket;
    return action;
}

function actionDelete(config) {
    var action = new AbstractCouchAction(config);
    action.method = 'DELETE';
    action.uri = action.baseuri + '/' + config.bucket;
    return action;
}

function actionCreate(config) {
    var action = new AbstractCouchAction(config);
    action.method = 'POST';
    action.form = {
        name: config.bucket,
        ramQuotaMB: 100,
        authType: "sasl",
        saslPassword: config.password,
        replicaNumber: 0,
        flushEnabled: 1
    };
    action.uri = action.baseuri;
    return action;
}

function actionUpdate(config) {
    var action = actionCreate(config);
    action.uri = action.baseuri + '/' + config.bucket;
    return action;
}

function actionFlush(config) {
    var action = new AbstractCouchAction(config);
    action.method = 'POST';
    action.form = { };
    action.uri = action.baseuri + '/' + config.bucket + '/controller/doFlush';
    return action;
}

function CouchBucket(config) {
    this.bucketActions = {};

    this.bucketActions.retrieve = actionRetrieve(config);
    this.bucketActions.delete = actionDelete(config);
    this.bucketActions.create = actionCreate(config);
    this.bucketActions.update = actionUpdate(config);
    this.bucketActions.flush = actionFlush(config);
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