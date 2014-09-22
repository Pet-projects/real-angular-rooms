'use strict';

describe('As a owner', function() {

  describe("when I go to the list of beers", function() {
    
    beforeEach(function() {
      browser.get('/');
    });

    it('I should see 5 beers', function() {
      
      var beerList = element.all(by.repeater('beer in beers'));
      expect(beerList.count()).toBe(5);

    });

  });  

});