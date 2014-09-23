angular.module('lateRooms', [
  'ngRoute',
  'lateRooms.domain'
]).

config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/cancellationPolicy',       { 
        templateUrl: '/domain/cancellationPolicy/cancellationPolicy.html'
    });

    $routeProvider.when('/',       { 
        templateUrl: '/domain/landingPage/landingPage.html',
        controller: 'LandingPageController'
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

    $routeProvider.otherwise({ redirectTo: '/rooms' });
    
    $locationProvider.html5Mode(true);
}]);