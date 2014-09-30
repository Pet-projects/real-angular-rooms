// set up ======================================================================
var restify = require('restify');

exports.start = function(config) {
    var server = restify.createServer();

    require('./rest/rooms')(server);

    server.listen(config.port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};
