const Hapi = require('hapi');
const config = require('config');
const auth = require('./auth');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: config.get('port'),
});

auth(server);

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => reply('hello world'),
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
