angular.module('lateRooms.domain.room')
	
	.controller('RoomsController', 
		['$scope', '$location', 'RoomService', 
		function($scope, $location, roomService) {

	    $scope.populateRoomsTable = function(id) {
			roomService.list().then(function(data) {
		        $scope.rooms = data;
		    });
		};

		$scope.removeRoom = function(id) {
			roomService.remove(id).then(function() {
		        $scope.populateRoomsTable();
		    });
		};

		$scope.newRoom = function() {
			$location.path( "/rooms/new" );
		};

		$scope.editRoom = function(id) {
			$location.path( "/rooms/edit/" + id );
		};

		$scope.populateRoomsTable();
}]);