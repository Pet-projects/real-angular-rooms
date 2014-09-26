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

//~~~~~~Exposing a public interface

function CouchBucket(config) {
    this.config = config;
}

CouchBucket.prototype.ensureCreated = function() {
    var _action = actionRetrieve(this.config);

    console.log('Making request: ' + _action.method + ' ' + _action.uri);
    request(_action)
        .then(createRequest(actionUpdate(this.config)))
        .catch(createRequest(actionCreate(this.config)));
};

CouchBucket.prototype.create = function() {
    var _request = createRequest(actionCreate(this.config));
    _request();
};

CouchBucket.prototype.update = function() {
    var _request = createRequest(actionUpdate(this.config));
    _request();
};

CouchBucket.prototype.flush = function() {
    var _request = createRequest(actionFlush(this.config));
    _request();
};

CouchBucket.prototype.delete = function() {
    var _request = createRequest(actionDelete(this.config));
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