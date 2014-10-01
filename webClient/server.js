// set up ======================================================================
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var proxy = require('express-http-proxy');
var methodOverride = require('method-override');

exports.start = function(config) {
    var app = module.exports = express();
    var server = require('http').Server(app);

    //Logging
    app.use(morgan('dev'));

    //Static content
    app.use(express.static(__dirname + config.appFolder));
    var index = function(req, res) {
        res.sendFile(__dirname + config.appFolder + "/index.html");
    };

    // Routes
    app.use('/api', proxy(config.backend.address, {
        forwardPath: function(req, res) {
            return require('url').parse(req.url).path;
        }
    }));

    // redirect all  to the index (HTML5 history)
    app.get('/', index);
    app.get('*', index);

    // Start server
    server.listen(config.port, function() {
        console.log("Express server listening on port %d", server.address().port);
    });
};
