angular.module('ngRooms.common.security')
  
  .controller('AuthenticationController', 
    ['$scope', '$auth', 'AccountService', function($scope, $auth, accountService) {

      $scope.authenticateWithFacebook = function() {
        $auth.authenticate('facebook');
      };

      $scope.authenticateWithGoogle = function() {
        $auth.authenticate('google');
      };

       $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.logout = function() {
          return $auth.logout();
      };

      accountService.get().then(function(account) {
          $scope.displayName = account.displayName;
      });
  }]);