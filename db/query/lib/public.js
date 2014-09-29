'use strict';

var db = require('./connection');
var _ = require('underscore');

var getKey = function (room) {
    return room.id;
};

module.exports.storeRoom = function(room, callback) {
    db.set(getKey(room), room, callback);
};

module.exports.storeRooms = function(rooms, callback) {
    var docs = {};

    rooms.forEach(function(room) {
        docs[getKey(room)] = { value: room } ;
    });

    db.setMulti(docs, {}, callback);
};

module.exports.shutdown = function() {
    db.shutdown();
};