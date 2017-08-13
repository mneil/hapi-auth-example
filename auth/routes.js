const Boom = require('boom');

/**
 * All authentication providers will run through this handler and set a cookie
 * @param {*} request 
 * @param {*} reply 
 */
function handler(request, reply) {
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
}
// Twitter authentication route settings
module.exports.twitter = {
  method: 'GET',
  path: '/auth/twitter',
  config: {
    auth: 'twitter',
    handler,
  },
};
// Facebook authentication route settings
module.exports.facebook = {
  method: 'GET',
  path: '/auth/facebook',
  config: {
    auth: 'facebook',
    handler,
  },
};
// Google authentication route settings
module.exports.google = {
  method: 'GET',
  path: '/auth/google',
  config: {
    auth: 'google',
    handler,
  },
};
