'use strict';

describe('As a owner', function() {

  describe("when I go to the list of beers", function() {
    
    beforeEach(function() {
      	browser.get('/beers');
    });

    it('I should see 5 beers', function() {
      
      	var beerList = element.all(by.repeater('beer in beers'));
      	expect(beerList.count()).toBe(5);

    });

    it('I should be able to delete the first beer', function() {
      	
      	element(by.repeater('beer in beers').row(0)).$('#btnRemoveBeer').click()

      	var beerList = element.all(by.repeater('beer in beers'));
      	expect(beerList.count()).toBe(4);
    });

  });  

});