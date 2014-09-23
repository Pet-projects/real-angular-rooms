angular.module('lateRooms.domain.room')
    
    .factory('RoomService', [function () {
        var rooms = [ 
                    { id: 1, name: "Premium", address: "Barbican" }, 
                    { id: 2, name: "Hostel", address: "Camden" },
                    { id: 3, name: "Hostel", address: "Ealing" },
                    { id: 4, name: "B&B ", address: "Westminster" },
                    { id: 5, name: "Premium", address: "Piccadilly" }];

    	return {

            getRooms: function () {
                return rooms;
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