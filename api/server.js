// set up ======================================================================
var restify = require('restify');

exports.start = function(config) {
    var server = restify.createServer();

    server.use(restify.bodyParser())

    require('./rest/rooms')(server);
	require('./rest/authentication')(server);

    server.listen(config.port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};
