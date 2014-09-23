// set up ======================================================================
var restify = require('restify');

exports.start = function(config) {
    var server = restify.createServer();

    server.get('/rooms', function(req, res, next) {
        var rooms = [
            { id: 1, name: "Premium", address: "Barbican" },
            { id: 2, name: "Hostel", address: "Camden" },
            { id: 3, name: "Hostel", address: "Ealing" },
            { id: 4, name: "B&B ", address: "Westminster" },
            { id: 5, name: "Premium", address: "Piccadilly" }];


        res.send(200, rooms);
        return next();
    });

    server.listen(config.port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};
