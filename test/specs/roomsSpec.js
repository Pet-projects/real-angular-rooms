'use strict';

var roomsPage = require('../pageObjects/roomsPage');
var dbAdmin = require('rooms-db-setup');
var db = require('rooms-db-query');


var rooms = [
    { id: 1, name: "Premium", address: "Barbican" },
    { id: 2, name: "Hostel", address: "Camden" },
    { id: 3, name: "Hostel", address: "Ealing" },
    { id: 4, name: "B&B ", address: "Westminster" },
    { id: 5, name: "Premium", address: "Piccadilly" }];

db.storeRoom(rooms[0], function(err, result) {
    console.log(result);
});

describe('As a owner', function() {
  
  describe("when I go to the list of rooms", function() {

    beforeEach(function() {
        var done = false;

        dbAdmin.flush(function() {
            db.storeRooms(rooms, function(err, result) {
                console.log('Performed seeding');
//                db.shutdown();

                roomsPage.resetData();
                roomsPage.navigate();
                done = true;
            });
        });

        waitsFor(function(){
            return done;
        }, 2000);
    });

    it('I should see 5 rooms', function() {
      	var roomList = roomsPage.getListOfRooms();
      	expect(roomList.count()).toBe(5);

    });

    it('I should be able to delete the first room', function() {

      	roomsPage.deleteRoomAtRow(0);

      	var roomList = roomsPage.getListOfRooms();
      	expect(roomList.count()).toBe(4);
    });

    it('I should be able to go to edit room feature', function() {
        
        roomsPage.editRoomAtRow(0)

        expect(browser.getCurrentUrl()).toContain('/rooms/edit/1');
    });

    it('I should be able to go to the new room feature', function() {
        
        roomsPage.newRoom.click()

        expect(browser.getCurrentUrl()).toContain('/rooms/new');
    });

  });  

});