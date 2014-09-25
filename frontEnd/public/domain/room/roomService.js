angular.module('lateRooms.domain.room')
    
    .factory('RoomService', ['Restangular', function (restangular) {
       
       var domain = 'rooms';

       return {

            list: function() {
                return restangular.all(domain).customGET('list');               
            },

            remove: function (id) {
                return restangular.one(domain).one('delete').customDELETE(id);
            }

        };
    }]);