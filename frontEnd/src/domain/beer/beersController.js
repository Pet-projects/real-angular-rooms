var beerModule = angular.module('beerApp.domain.beer',[]);

beerModule.controller('BeersController', ['$scope', 'BeerService', function($scope, beerService) {
	
	$scope.beers = beerService.getBeers();

}]);