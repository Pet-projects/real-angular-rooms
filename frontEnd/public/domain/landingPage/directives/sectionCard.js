angular.module('lateRooms.domain.landingPage.directives')
    
    .directive('sectionCard', ['$location', function ($location) {
        return {
            replace: true,

            scope: {
                route: "@route",
                title: "@title",
                description: "@description",
                imagePath: "@imagePath"
            },

            templateUrl: '/domain/landingPage/directives/sectionCard.html',

            link: function (scope, element, attributes) {
                scope.goTo = function (route)
                {
                    $location.path( route );          
                }
            }
        };
    }]);