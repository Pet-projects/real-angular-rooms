'use strict';

var roomsPage = require('../pageObjects/roomsPage');
var dbAdmin = require('rooms-db-setup');
var db = require('rooms-db-query');

var couchTimeout = 60 * 1000;  // couch might need a long time before flushing
var couchIndexing = 1000;  // couch needs to index the newly received data

var rooms = [
    { id: 1, name: "Premium", address: "Barbican" },
    { id: 2, name: "Hostel", address: "Camden" },
    { id: 3, name: "Hostel", address: "Ealing" },
    { id: 4, name: "B&B ", address: "Westminster" },
    { id: 5, name: "Premium", address: "Piccadilly" }];

var flushAndSeed = function() {
    var done = false;

    dbAdmin.flush(function() {
        db.storeRooms(rooms, function(err, result) {
            console.log('Performed seeding');
            roomsPage.navigate();
            done = true;
        });
    });

    waitsFor(function(){
        return done;
    }, couchTimeout);

    waits(couchIndexing);
};
flushAndSeed();

describe('As a owner', function() {

  describe("when I go to the list of rooms", function() {

    beforeEach(function() {
        roomsPage.navigate();
    });

    it('I should see the rooms', function() {
      	var roomList = roomsPage.getListOfRooms();
      	expect(roomList.count()).toBe(rooms.length);

    });

    it('I should be able to delete the first room', function() {

      	roomsPage.deleteRoomAtRow(0);

      	var roomList = roomsPage.getListOfRooms();
      	expect(roomList.count()).toBe(rooms.length - 1);
    });

    it('I should be able to go to edit room feature', function() {

        roomsPage.editRoomAtRow(0)

        expect(browser.getCurrentUrl()).toContain('/rooms/edit/2');
    });

    it('I should be able to go to the new room feature', function() {

        roomsPage.newRoom.click()

        expect(browser.getCurrentUrl()).toContain('/rooms/new');
    });

  });

});