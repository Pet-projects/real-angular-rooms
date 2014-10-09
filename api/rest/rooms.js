'use strict';

var db = require('rooms-db-query');

module.exports = function(server){
	server.get('/rooms', function(req, res, next) {
        db.rooms.getList(function(rooms) {
            res.send(200, rooms);
            return next();
        });
    });

    server.del('/rooms/:id', function (req, res, next) {
        var id = parseInt(req.params.id);

        db.rooms.delete(id, function() {
            res.send();
            return next();
        });
    });

};