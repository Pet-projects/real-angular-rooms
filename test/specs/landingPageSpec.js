'use strict';

describe('As a client', function() {
  
  describe("when I go to the landing page of LateRooms", function() {

    beforeEach(function() {
      browser.get('/');
    });

    it('I should be able to go to the "rooms" feature', function() {
      $('#goToRooms').click()

      expect(browser.getCurrentUrl()).toContain('/rooms');
    });   

    it('I should be able to go to the "rates & availability" feature', function() {
      $('#goToRates').click()

      expect(browser.getCurrentUrl()).toContain('/rate');
    }); 

    it('I should be able to go to the "supplements" feature', function() {
      $('#goToSupplements').click()

      expect(browser.getCurrentUrl()).toContain('/supplement');
    }); 

    it('I should be able to go to the "cancellation policies" feature', function() {
      $('#goToCancellation').click()

      expect(browser.getCurrentUrl()).toContain('/cancellationPolicy');
    }); 

  });  

});