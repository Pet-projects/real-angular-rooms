'use strict';

var request = require('request-promise');

function AbstractCouchAction(config) {
    this.auth = { 'user': config.adminUser, 'pass': config.adminPassword };
    this.method = 'GET';
    this.bucketBase = 'http://' + config.host + ':' + config.adminPort + '/pools/default/buckets';
    this.designBase = 'http://' + config.host + ':' + config.designPort;
    this.body = '';
}

function actionRetrieve(config) {
    var action = new AbstractCouchAction(config);
    action.method = 'GET';
    action.uri = action.bucketBase + '/' + config.bucket;
    return action;
}

function actionDelete(config) {
    var action = new AbstractCouchAction(config);
    action.method = 'DELETE';
    action.uri = action.bucketBase + '/' + config.bucket;
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
    action.uri = action.bucketBase;
    return action;
}

function actionUpdate(config) {
    var action = actionCreate(config);
    action.uri = action.bucketBase + '/' + config.bucket;
    return action;
}

function actionDesignDocument(config) {
    var designDoc = config.designDocument;
    var action = new AbstractCouchAction(config);
    action.method = 'PUT';
    action.uri = action.designBase + '/' + config.bucket + '/_design/' + designDoc.name;
    action.headers = {
        'Content-Type': 'application/json'
    };
    action.body = designDoc.content;
    return action;
}

function actionFlush(config) {
    var action = new AbstractCouchAction(config);
    action.method = 'POST';
    action.form = { };
    action.uri = action.bucketBase + '/' + config.bucket + '/controller/doFlush';
    return action;
}

//~~~~~~Exposing a public interface

function CouchBucket(config) {
    this.config = config;
}

CouchBucket.prototype.ensureCreated = function(callback) {
    var parentThis = this;

    var thenConfigureDDoc = function() {
        parentThis.configureDesignDocument(callback);
    }

    this.retrieve(
        function updateExisting() {
            parentThis.update(thenConfigureDDoc);
        },
        function createNew() {
            parentThis.create(thenConfigureDDoc);
        }
    );


};

CouchBucket.prototype.retrieve = function(callback, errorCallback) {
    performAction(actionRetrieve(this.config), callback, errorCallback );
};

CouchBucket.prototype.create = function(callback, errorCallback) {
    performAction(actionCreate(this.config), callback, errorCallback );
};

CouchBucket.prototype.update = function(callback, errorCallback) {
    performAction(actionUpdate(this.config), callback, errorCallback );
};

CouchBucket.prototype.configureDesignDocument = function(callback, errorCallback) {
    performAction(actionDesignDocument(this.config), callback, errorCallback );
};

CouchBucket.prototype.flush = function(callback, errorCallback) {
    performAction(actionFlush(this.config), callback, errorCallback );
};

CouchBucket.prototype.delete = function(callback, errorCallback) {
    performAction(actionDelete(this.config), callback, errorCallback );
};

//Private use

function performAction(action, callback, errorCallback) {
    console.log('X Making request: ' + action.method + ' ' + action.uri);
    errorCallback = typeof errorCallback !== 'undefined' ? errorCallback : handleError;
    request(action)
        .then(callback)
        .catch(errorCallback);
}

function handleError(error) {
    console.log("Error. Status code is: " + error.statusCode);
    console.log(error.options.method + ' ' + error.options.uri);
    if (error.response != null) {
        console.log(error.response.body);
    }
};

// Export

module.exports=function(config) {
    return new CouchBucket(config);
};