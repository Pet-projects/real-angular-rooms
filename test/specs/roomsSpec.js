'use strict';

var roomsPage = require('../pageObjects/roomsPage');
var database = require('rooms-database');

describe('As a owner', function() {
  
  describe("when I go to the list of rooms", function() {

    beforeEach(function() {
        database.purge();
        roomsPage.resetData();
        roomsPage.navigate();
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