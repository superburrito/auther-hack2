'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

module.exports = new GoogleStrategy({
    clientID: '977490772212-5ucqtp0l1hrk8lm77m5f2nl3odho8n4b.apps.googleusercontent.com',
    clientSecret: 'USZjFqtFf-tM2XE6u_u1UZyR',
    callbackURL: 'http://127.0.0.1:8080/auth/:google/callback'
},
function (token, refreshToken,  profile, triggerSerializationOfUser) {
  // this only runs when somebody logs in through google
  User.findOrCreate({
    where: {googleId: profile.id},
    defaults: {
      email: profile.emails[0].value,
      name: profile.displayName,
      photo: profile.photos[0].value
    }
  })
  .spread(function (user) {
    triggerSerializationOfUser(null, user);
  })
  .catch(triggerSerializationOfUser);
});