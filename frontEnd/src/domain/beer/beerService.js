angular.module('beerApp.domain.beer')
    
    .factory('BeerService', [function () {
    	return {

            getBeers: function () {
                return [ 
                	{ id: 1, name: "Skoll", brewery: "Brahma" }, 
			    	{ id: 2, name: "Guinness", brewery: "Guinness" },
			    	{ id: 3, name: "Heineken", brewery: "Heineken International" },
                    { id: 4, name: "Budweiser ", brewery: "Anheuser-Busch InBev" },
                    { id: 5, name: "Strongbow", brewery: "Guinness" }                    
			    ];
            }
            
        };
    }]);