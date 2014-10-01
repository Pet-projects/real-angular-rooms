angular.module('lateRooms.domain.room')
    
    .factory('RoomService', ['Restangular', function (restangular) {
       
       var domain = 'rooms';

       return {

            list: function() {
                return restangular.all(domain).getList();               
            },

            remove: function (id) {
                return restangular.one(domain, id).remove();
            }

        };
    }]);