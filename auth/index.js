const bell = require('bell');
const config = require('config');

module.exports = function auth(server) {
  // todo: auth
  server.register(bell, (err) => {
    if (err) {
      throw err;
    }
    // Declare an authentication strategy using the bell scheme
    // with the name of the provider, cookie encryption password,
    // and the OAuth client credentials.
    server.auth.strategy('twitter', 'bell', {
      provider: 'twitter',
      password: 'cookie_encryption_password_secure',
      clientId: config.get('twitter.id'),
      clientSecret: config.get('twitter.secret'),
      // Terrible idea but required if not using HTTPS especially if developing locally
      isSecure: false,
    });
    // Use the 'twitter' authentication strategy to protect the
    // endpoint handling the incoming authentication credentials.
    // This endpoints usually looks up the third party account in
    // the database and sets some application state (cookie) with
    // the local application account information.
    server.route({
      method: ['GET', 'POST'], // Must handle both GET and POST
      path: '/login', // The callback endpoint registered with the provider
      config: {
        auth: 'twitter',
        handler: (request, reply) => {
          if (!request.auth.isAuthenticated) {
            return reply(`Authentication failed due to: ${request.auth.error.message}`);
          }
          // Perform any account lookup or registration, setup local session,
          // and redirect to the application. The third-party credentials are
          // stored in request.auth.credentials. Any query parameters from
          // the initial request are passed back via request.auth.credentials.query.
          return reply.redirect('/home');
        },
      },
    });
  });
};
