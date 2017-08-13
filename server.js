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

server.route({
  method: 'GET',
  path: '/',
  config: {
    auth: 'session', // require a session for this, so we have access to the twitter profile
    handler: (request, reply) => {
      // Return a message using the information from the session
      reply(`Hello, ${request.auth.credentials.displayName}!`);
    },
  },
});
server.route({
  method: 'GET',
  path: '/login',
  config: {
    auth: { mode: 'try' },
    plugins: { 'hapi-auth-cookie': { redirectTo: false } },
    handler: (request, reply) => {
      // Return a message using the information from the session
      reply(`<h2>Hello, you need to login!</h2/>
      <p><a href="/auth/twitter">Login with Twitter</a></p>
      <p><a href="/auth/facebook">Login with Facebook</a></p>
      <p><a href="/auth/google">Login with Google</a></p>`);
    },
  },
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
