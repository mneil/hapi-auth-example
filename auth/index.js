const Bell = require('bell');
const AuthCookie = require('hapi-auth-cookie');
const Providers = require('./providers');
const Routes = require('./routes');

module.exports = function auth(server) {
  // Register bell and hapi-auth-cookie with the server
  server.register([AuthCookie, Bell], (err) => {
    if (err) {
      throw err;
    }
    // Add our authentication strategies
    server.auth.strategy('session', 'cookie', Providers.cookie);
    server.auth.strategy('twitter', 'bell', Providers.twitter);
    server.auth.strategy('facebook', 'bell', Providers.facebook);
    server.auth.strategy('google', 'bell', Providers.google);
    // Default authentication strategy
    server.auth.default('session');

    server.route(Routes.twitter);
    server.route(Routes.facebook);
    server.route(Routes.google);
  });
};
