const Config = require('config');

// Setup the social Twitter login strategy
module.exports.twitter = {
  provider: 'twitter',
  password: Config.get('twitter.password'),
  clientId: Config.get('twitter.id'),
  clientSecret: Config.get('twitter.secret'),
  isSecure: Config.get('cookie.secure'),
};
// Setup the social Facebook login strategy
module.exports.facebook = {
  provider: 'facebook',
  password: Config.get('facebook.password'),
  clientId: Config.get('facebook.id'),
  clientSecret: Config.get('facebook.secret'),
  isSecure: Config.get('cookie.secure'),
};
// Setup the social Google login strategy
module.exports.google = {
  provider: 'google',
  password: Config.get('google.password'),
  clientId: Config.get('google.id'),
  clientSecret: Config.get('google.secret'),
  isSecure: Config.get('cookie.secure'),
};
// Cookie sessions setup
module.exports.cookie = {
  password: Config.get('cookie.secret'),
  redirectTo: '/login',
  isSecure: Config.get('cookie.secure'),
  isSameSite: 'Lax',
};
