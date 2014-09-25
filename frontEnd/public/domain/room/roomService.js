angular.module('lateRooms.domain.room')
    
    .factory('RoomService', ['$http', function ($http) {
       return {

            list: function() {
                var promise = $http.get('api/rooms/list').then(function (response) {
                    return response.data;
                });
                
                return promise;
            },

            remove: function (id) {                
                var promise = $http.delete('api/rooms/delete/' + id);
                
                return promise;
            }
            
        };
    }]);