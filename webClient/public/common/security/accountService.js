var securityModule = angular.module('ngRooms.common.security',[]);

securityModule.factory('AccountService', ['Restangular', function (restangular) {
       
       var domain = 'auth';

       return {

            get: function() {
                return restangular.all(domain).customGET("me");               
            }

        };
    }]);