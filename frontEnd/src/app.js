angular.module('beerApp', [
  'ngRoute',
  'beerApp.domain'
]).

config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/beers',     	{ 
		templateUrl: '/src/domain/beer/beers.html', 
    	controller: 'BeersController' 
    });

    $routeProvider.otherwise({ redirectTo: '/beers' });

}]);