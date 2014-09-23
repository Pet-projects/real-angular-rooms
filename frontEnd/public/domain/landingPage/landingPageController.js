var roomModule = angular.module('lateRooms.domain.landingPage',[]);

roomModule.controller('LandingPageController', 
	['$scope', '$location', 
	function($scope, $location) {
	
	$scope.goToRooms = function() {
		$location.path( "/rooms" );
	};

	$scope.goToRates = function() {
		$location.path( "/rate" );
	};

	$scope.goToSupplements = function() {
		$location.path( "/supplement" );
	};

	$scope.goToCancellation = function() {
		$location.path( "/cancellationPolicy" );
	};
}]);