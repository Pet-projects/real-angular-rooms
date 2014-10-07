angular.module('ngRooms.common.security', ['googleOauth']).

  config(function (TokenProvider) {

      TokenProvider.extendConfig({
          clientId: '279805487456-u3c7d5rpqqenunrgt2ia0p91h1198n4b.apps.googleusercontent.com',
          redirectUri: 'http://localhost:3000/oauth2callback'
      });
  });