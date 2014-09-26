exports = module.exports = function(server){
    var rooms = [
            { id: 1, name: "Premium", address: "Barbican" },
            { id: 2, name: "Hostel", address: "Camden" },
            { id: 3, name: "Hostel", address: "Ealing" },
            { id: 4, name: "B&B ", address: "Westminster" },
            { id: 5, name: "Premium", address: "Piccadilly" }];

	server.get('/rooms', function(req, res, next) {
        
        res.send(200, rooms);
        return next();
    });

    server.del('/rooms/:id', function (req, res, next) {
        var id = parseInt(req.params.id);
        
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].id && rooms[i].id === id) { 
                rooms.splice(i, 1);
                break;
            }
        }

        res.send();
        return next();     
    })

    server.get('/rooms/resetData', function(req, res, next) {
        
        rooms = [
            { id: 1, name: "Premium", address: "Barbican" },
            { id: 2, name: "Hostel", address: "Camden" },
            { id: 3, name: "Hostel", address: "Ealing" },
            { id: 4, name: "B&B ", address: "Westminster" },
            { id: 5, name: "Premium", address: "Piccadilly" }]

        res.send(200, rooms);
        return next();
    });

};