angular.module('ngRooms.common.security')

    controller('AutheticationController', function ($rootScope, $scope, $window, Token) {
        $scope.accessToken = Token.get();

        $scope.authenticate = function () {
            var extraParams = $scope.askApproval ? { approval_prompt: 'force'} : {};
            Token.getTokenByPopup(extraParams)
            .then(function (params) {
                Token.verifyAsync(params.access_token).
                then(function (data) {
                    $rootScope.$apply(function () {
                        $scope.accessToken = params.access_token;
                        $scope.expiresIn = params.expires_in;

                        Token.set(params.access_token);
                    });
                }, function () {
                    alert("Failed to verify token.")
                });

            }, function () {
                alert("Failed to get token from popup.");
            });
        };
    });