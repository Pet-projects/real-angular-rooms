var roomModule = angular.module('lateRooms.domain.room',[]);

roomModule.controller('RoomsController', 
	['$scope', '$location', 'RoomService', 
	function($scope, $location, roomService) {
	
	$scope.rooms = roomService.getRooms();

	$scope.removeRoom = function(id) {
		roomService.removeRoom(id);
	};

	$scope.newRoom = function() {
		$location.path( "/rooms/new" );
	};

	$scope.editRoom = function(id) {
		$location.path( "/rooms/edit/" + id );
	};

}]);