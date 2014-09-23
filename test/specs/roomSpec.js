'use strict';

describe('As a owner', function() {
  
  describe("when I go to the list of rooms", function() {

    beforeEach(function() {
      	browser.get('/rooms');
    });

    it('I should see 5 rooms', function() {
      
      	var roomList = element.all(by.repeater('room in rooms'));
      	expect(roomList.count()).toBe(5);

    });

    it('I should be able to delete the first room', function() {
      	
      	element(by.repeater('room in rooms').row(0)).$('#btnRemoveRoom').click()

      	var roomList = element.all(by.repeater('room in rooms'));
      	expect(roomList.count()).toBe(4);
    });

    it('I should be able to go to edit room feature', function() {
        
        element(by.repeater('room in rooms').row(0)).$('#btnEditRoom').click()

        expect(browser.getCurrentUrl()).toContain('/rooms/edit/1');
    });

    it('I should be able to go to the new room feature', function() {
        
        $('#btnNewRoom').click()

        expect(browser.getCurrentUrl()).toContain('/rooms/new');
    });

  });  

});