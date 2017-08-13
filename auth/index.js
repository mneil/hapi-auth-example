const bell = require('bell');
const config = require('config');
const authCookie = require('hapi-auth-cookie');
const Boom = require('boom');

module.exports = function auth(server) {
  // Register bell and hapi-auth-cookie with the server
  server.register([authCookie, bell], (err) => {
    if (err) {
      throw err;
    }
    // Setup the session strategy
    server.auth.strategy('session', 'cookie', {
      // cookie: 'abp',
      password: config.get('cookie.secret'), // Use something more secure in production
      redirectTo: '/login', // If there is no session, redirect here
      isSecure: false, // Should be set to true (which is the default) in production
      isSameSite: 'Lax',
    });
    server.auth.default('session');
    // Setup the social Twitter login strategy
    server.auth.strategy('twitter', 'bell', {
      provider: 'twitter',
      password: config.get('twitter.secret'),
      clientId: config.get('twitter.id'),
      clientSecret: config.get('twitter.secret'),
      isSecure: config.get('cookie.secure'), // Should be set to true (which is the default) in production
    });
    // Setup the routes (this could be done in an own file but for the sake of simplicity isn't)
    server.route({
      method: 'GET',
      path: '/auth/twitter',
      config: {
        auth: 'twitter', // <-- use our twitter strategy and let bell take over
        handler: (request, reply) => {
          if (!request.auth.isAuthenticated) {
            return reply(Boom.unauthorized(`Authentication failed due to: ${request.auth.error.message}`));
          }
          // Just store a part of the twitter profile information in the session as an example. 
          // You could do something more useful here 
          // - like loading or setting up an account (social signup).
          const profile = request.auth.credentials.profile;
          request.cookieAuth.set({
            twitterId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
          });
          // console.log('doing a redirect', profile, profile.raw.entities);
          return reply.redirect('/');
        },
      },
    });
    server.route({
      method: 'GET',
      path: '/',
      config: {
        auth: 'session', // <-- require a session for this, so we have access to the twitter profile
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
          reply('Hello, you need to login!<p><a href="/auth/twitter">Login with Twitter</a></p>');
        },
      },
    });
  });
};
