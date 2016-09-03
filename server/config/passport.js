var configAuth = require('./auth');

var User = require('../models/user');

var FacebookTokenStrategy = require('passport-facebook-token');


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use('facebook-token', new FacebookTokenStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,

    },
    function(token, refreshToken, profile, done) {

        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

            if (err)
            return done(err);

            if (user) {
                return done(null, user);
            } else {
                var newUser = new User();

                newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
                newUser.email = profile.emails[0].value;
                newUser.role = 'user';
                newUser.facebook.id = profile.id;
                newUser.facebook.token = token;
                newUser.facebook.email = profile.emails[0].value;

                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                    throw err;

                    // if successful, return the new user
                    return done(null, newUser);
                });
            }

        });

    }));

};
