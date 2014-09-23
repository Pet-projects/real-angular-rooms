// set up ======================================================================
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

exports.start = function(config, errorCallback) {
    var app = module.exports = express();
    var server = require('http').Server(app);

    // Configuration
    app.use(morgan('dev'));
    app.use(express.static(__dirname + '/public'));

    var index = function(req, res) {
        res.sendFile(__dirname + "/public/index.html");
    };

    // Routes
    app.get('/', index);

    // redirect all others to the index (HTML5 history)
    app.get('*', index);

    // Start server
    server.listen(3000, function() {
        console.log("Express server listening on port %d", server.address().port);
    });
};
