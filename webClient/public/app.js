angular.module('ngRooms', [
  'ngRoute',
  'restangular',
  'ngRooms.common',
  'ngRooms.domain'
]).

config(['$routeProvider', '$locationProvider', 'RestangularProvider',  
    function ($routeProvider, $locationProvider, restangularProvider) {

    $routeProvider
        .when('/', { templateUrl: '/domain/landingPage/landingPage.html' })
        .when('/analytics', { templateUrl: '/domain/analytics/analytics.html' })
        .when('/cancellationPolicy', { templateUrl: '/domain/cancellationPolicy/cancellationPolicy.html' })    
        .when('/rate', { templateUrl: '/domain/rate/rate.html' })
        .when('/supplement', { templateUrl: '/domain/supplement/supplement.html' })
        .when('/tutorial', { templateUrl: '/domain/tutorial/tutorial.html' })

        .when('/rooms', { 
    		templateUrl: '/domain/room/rooms.html',
        	controller: 'RoomsController' })
        .when('/rooms/new', { 
    		templateUrl: '/domain/room/room.html',
        	controller: 'RoomController',
            access: userRoles.user })
        .when('/rooms/edit/:id', { 
            templateUrl: '/domain/room/room.html',
            controller: 'RoomController',
            access: userRoles.user });

    $routeProvider.otherwise({ redirectTo: '/rooms' });
    
    $locationProvider.html5Mode(true);

    restangularProvider.setBaseUrl('/api');
}]);