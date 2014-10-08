angular.module('ngRooms.common.security')

  .controller('AuthenticationController',
    ['$scope', '$auth', 'AccountService', function ($scope, $auth, accountService) {

        $scope.authenticateWithFacebook = function () {
            $auth.authenticate('facebook');
        };

        $scope.authenticateWithGoogle = function () {
            $auth.authenticate('google').then(function (response) {
                $scope.getAccount();
            });
        };

        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        $scope.logout = function () {
            return $auth.logout();
        };

        $scope.getAccount = function () {
            accountService.get().then(function (account) {
                $scope.displayName = account.displayName;
            });
        };

        $scope.getAccount();

    }]);