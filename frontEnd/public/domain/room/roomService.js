angular.module('lateRooms.domain.room')
    
    .factory('RoomService', ['$http', function ($http) {
        var rooms = [
                    { id: 1, name: "Premium", address: "Barbican" }, 
                    { id: 2, name: "Hostel", address: "Camden" },
                    { id: 3, name: "Hostel", address: "Ealing" },
                    { id: 4, name: "B&B ", address: "Westminster" },
                    { id: 5, name: "Premium", address: "Piccadilly" }];

    	return {

//            callForRooms: function () {
//                return rooms;
//            },

            callForRooms: function() {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('api/rooms/list').then(function (response) {
                    // The then function here is an opportunity to modify the response
                    console.log(response);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },

            removeRoom: function (id) {                
                for (var i = 0; i < rooms.length; i++) {
                    if (rooms[i].id && rooms[i].id === id) { 
                        rooms.splice(i, 1);
                        break;
                    }
                }
            }
            
        };
    }]);