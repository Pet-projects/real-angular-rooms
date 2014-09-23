var restify = require('restify');

var server = restify.createServer({ name: 'LateRoomsApi' });
 
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
});

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());