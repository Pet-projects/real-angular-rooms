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


module.exports.getRooms = function(callbackWithRooms) {
    var q = {
        limit: 10, // configure max number of entries.
        stale: false // We don't want stale views here.
    };
    db.view("ddoc", "all", q).query(function(err, values) {
        // 'by_name' view's map function emits beer-name as key and value as
        // null. So values will be a list of
        //      [ {id: <beer-id>, key: <beer-name>, value: <null>}, ... ]

        // we will fetch all the beer documents based on its id.
        var keys = _.pluck(values, 'id');

        db.getMulti(keys, null, function(err, results) {

            // Add the id to the document before sending to template
            var rooms = _.map(results, function(v, k) {
                v.value.id = k;
                return v.value;
            });

            callbackWithRooms(rooms);
        });
    });
};


module.exports.deleteRoom = function(id, callback) {
    db.remove(id, callback);
};

module.exports.shutdown = function() {
    db.shutdown();
};