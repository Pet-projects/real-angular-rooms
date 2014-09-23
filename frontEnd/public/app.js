angular.module('beerApp', [
  'ngRoute',
  'beerApp.domain'
]).

config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $routeProvider.when('/beers',     	{ 
		templateUrl: '/domain/beer/beers.html',
    	controller: 'BeersController' 
    });

    $routeProvider.otherwise({ redirectTo: '/beers' });


    $locationProvider.html5Mode(true);
}]);