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

    module.exports.rooms = [
        { id: 1, name: "Premium", address: "Barbican" },
        { id: 2, name: "Hostel", address: "Camden" },
        { id: 3, name: "Hostel", address: "Ealing" },
        { id: 4, name: "B&B ", address: "Westminster" },
        { id: 5, name: "Premium", address: "Piccadilly" }];

    db.setMulti(docs, {}, callback);
};


module.exports.getRooms = function(callbackWithRooms) {
    var rooms = module.exports.rooms;
    callbackWithRooms(rooms);
};


module.exports.deleteRoom = function(id, callback) {
    var rooms = module.exports.rooms;
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].id && rooms[i].id === id) {
            rooms.splice(i, 1);
            break;
        }
    }
    callback();
}

module.exports.shutdown = function() {
    db.shutdown();
};