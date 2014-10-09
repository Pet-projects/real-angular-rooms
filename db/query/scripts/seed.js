'use strict';

var db = require('../lib/public.js');

var rooms = [
    { id: 1, name: "Premium", address: "Barbican" },
    { id: 2, name: "Hostel", address: "Camden" },
    { id: 3, name: "Hostel", address: "Ealing" },
    { id: 4, name: "B&B ", address: "Westminster" },
    { id: 5, name: "Premium", address: "Piccadilly" }];

db.rooms.store(rooms[0], function(err, result) {
    console.log(result);
} );

db.rooms.storeList(rooms, function(err, result) {
    console.log(result);
    db.rooms.shutdown();
} );