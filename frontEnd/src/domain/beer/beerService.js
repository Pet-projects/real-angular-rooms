angular.module('beerApp.domain.beer')
    
    .factory('BeerService', [function () {
        var beers = [ 
                    { id: 1, name: "Skoll", brewery: "Brahma" }, 
                    { id: 2, name: "Guinness", brewery: "Guinness" },
                    { id: 3, name: "Heineken", brewery: "Heineken International" },
                    { id: 4, name: "Budweiser ", brewery: "Anheuser-Busch InBev" },
                    { id: 5, name: "Strongbow", brewery: "Guinness" }];

    	return {

            getBeers: function () {
                return beers;
            },

            deleteBeer: function (id) {                
                for (var i = 0; i < beers.length; i++) {
                    if (beers[i].id && beers[i].id === id) { 
                        beers.splice(i, 1);
                        break;
                    }
                }
            }
            
        };
    }]);