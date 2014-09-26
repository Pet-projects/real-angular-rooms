'use strict';

var bucket = require('../lib/couchPublic.js');

var db = bucket.connect();

var new_beer = {
    "name": "Old Yankee Ale",
    "abv": 5.00,
    "ibu": 0,
    "srm": 0,
    "upc": 0,
    "type": "beer",
    "brewery_id": "cottrell_brewing_co",
    "updated": "2012-08-30 20:00:20",
    "description": ".A medium-bodied Amber Ale",
    "style": "American-Style Amber",
    "category": "North American Ale"
};
var beer_id = new_beer.brewery_id.toLowerCase() + '-' +
    new_beer.name.replace(' ', '-').toLowerCase();
// beer_id is "cottrell_brewing_co-old_yankee_ale"
db.set(beer_id, new_beer, function(err, result) {
    db.shutdown();
});
