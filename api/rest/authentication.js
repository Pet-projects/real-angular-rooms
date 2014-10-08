'use strict';

var db = require('rooms-db-query');
var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');

var config  = {
  TOKEN_SECRET: 'HardToGuessStringHaHa',
  GOOGLE_SECRET: 'QbN9cwhkbM5Mqp14R5Rd0hKU'
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

    server.ensureAuthenticated = function(req, res, next) {
        if (!req.headers.authorization) {
            return res.send(401, { message: 'Please make sure your request has an Authorization header' });
        }
      
        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);

        if (payload.exp <= moment().unix()) {
            return res.send(401, { message: 'Token has expired' });
        }

        req.user = payload.sub;
        next();
    };

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

        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, { json: true, form: params }, function (err, response, token) {
            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function (err, response, profile) {
                var user = {};
                user.google = profile.sub;
                user.displayName = profile.name;
                
                Users.push(user);
                
                var propValue;
                for(var propName in profile) {
                    propValue = profile[propName]

                    console.log(propName,propValue);
                }

                res.send({ token: createToken(user) });    
            });
        });
    });

    server.get('/auth/me', server.ensureAuthenticated, function(req, res) {
        res.send(Users.length > 0 ? Users[0] : undefined);      
    });

};