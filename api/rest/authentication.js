'use strict';

var db = require('rooms-db-query');
var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');

var config  = {
  TOKEN_SECRET: 'HardToGuessStringHaHa',
  GOOGLE_SECRET: 'QbN9cwhkbM5Mqp14R5Rd0hKU',
};

var createToken = function (user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};

var Users = [];

module.exports = function (server) {

    server.post('/auth/google', function (req, res) {
        var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

        var params = {
            client_id: req.body.clientId,
            redirect_uri: req.body.redirectUri,
            client_secret: config.GOOGLE_SECRET,
            code: req.body.code,
            grant_type: 'authorization_code'
        };

        console.log('params clientId %s', req.body.clientId);
        console.log('params redirectUri %s', req.body.redirectUri);
        console.log('params code %s', req.body.code);

        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, { json: true, form: params }, function (err, response, token) {
            console.log('1');
            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };
            console.log('2');

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function (err, response, profile) {
                console.log('3');
                var user = {};
                user.google = profile.sub;
                user.displayName = profile.name;
                
                Users.push(user);

                console.log('users length %s', Users.length);
                
                var propValue;
                for(var propName in profile) {
                    propValue = profile[propName]

                    console.log(propName,propValue);
                }

                console.log('user %s', response);
                console.log('user %s', profile.name);
                console.log('user %s', profile.sub);
                console.log('user %s', createToken(user));

                res.send({ token: createToken(user) });    
            });
        });
    });

    server.get('/auth/me', function(req, res) {
      res.send(Users.length > 0 ? Users[0] : undefined);      
    });
};