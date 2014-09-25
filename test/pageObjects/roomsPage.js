var request = require('request');

roomsPage = function () { 
 	var me = this;

 	this.resetData = function() {
       	request('http://localhost:3000/api/rooms/resetData');
    };

    this.navigate = function() {
        browser.get('/rooms');
    };

    this.getListOfRooms = function() {
        return element.all(by.repeater('room in rooms'));
    };

    this.getRoomsRow = function(rowNumber) {
        return element(by.repeater('room in rooms').row(rowNumber));
    };

    this.deleteRoomAtRow = function(rowNumber) {
        me.getRoomsRow(rowNumber).$('#btnRemoveRoom').click()
    };

    this.editRoomAtRow = function(rowNumber) {
        me.getRoomsRow(rowNumber).$('#btnEditRoom').click()
    };

    this.newRoom = $('#btnNewRoom');
};

module.exports = new roomsPage();