'use strict';

var db = require('./../connection');
var _ = require('underscore');

module.exports = function(query){
    query.rooms = {};

    var getRoomKey = function (room) {
        return room.id;
    };

    query.rooms.getList = function(callbackWithRooms) {
        var q = {
            limit: 10, 
            stale: false 
        };
        
        db.view("ddoc", "all", q).query(function(err, values) {
            var keys = _.pluck(values, 'id');

            db.getMulti(keys, null, function(err, results) {

                var rooms = _.map(results, function(v, k) {
                    v.value.id = k;
                    return v.value;
                });

                callbackWithRooms(rooms);
            });
        });
    };

    query.rooms.store = function(room, callback) {
        db.set(getKey(room), room, callback);
    };

    query.rooms.storeList = function(rooms, callback) {
        var docs = {};

        rooms.forEach(function(room) {
            docs[getKey(room)] = { value: room } ;
        });

        db.setMulti(docs, {}, callback);
    };

    query.rooms.delete = function(id, callback) {
        db.remove(id, callback);
    };

    query.rooms.shutdown = function() {
        db.shutdown();
    };
};
