angular.module('ngRooms', [
  'ngRoute',
  'restangular',
  'ngRooms.domain'
]).

config(['$routeProvider', '$locationProvider', 'RestangularProvider', 
    function ($routeProvider, $locationProvider, restangularProvider) {

    $routeProvider.when('/analytics',       { 
        templateUrl: '/domain/analytics/analytics.html'
    });

    $routeProvider.when('/cancellationPolicy',       { 
        templateUrl: '/domain/cancellationPolicy/cancellationPolicy.html'
    });

    $routeProvider.when('/',       { 
        templateUrl: '/domain/landingPage/landingPage.html'
    });

    $routeProvider.when('/rate',       { 
        templateUrl: '/domain/rate/rate.html'
    });

    $routeProvider.when('/rooms',     	{ 
		templateUrl: '/domain/room/rooms.html',
    	controller: 'RoomsController' 
    });

    $routeProvider.when('/rooms/new',     	{ 
		templateUrl: '/domain/room/room.html',
    	controller: 'RoomController' 
    });

    $routeProvider.when('/rooms/edit/:id',      { 
        templateUrl: '/domain/room/room.html',
        controller: 'RoomController' 
    });

    $routeProvider.when('/supplement',       { 
        templateUrl: '/domain/supplement/supplement.html'
    });

    $routeProvider.when('/tutorial',       { 
        templateUrl: '/domain/tutorial/tutorial.html'
    });

    $routeProvider.otherwise({ redirectTo: '/rooms' });
    
    $locationProvider.html5Mode(true);

    restangularProvider.setBaseUrl('/api');
}]);