const passport = require('passport'),
    googleStrategy = require('passport-google-oauth20').Strategy,
    secrets = require('../../../config/secrets'),
    models = require('../../db/models');


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    models.Admin.findOne({
        where : {
            id
        }
    }).then(user=>{
        done(null,user)
    });
});


passport.use(new googleStrategy({
        clientID: secrets.google.clientID,
        clientSecret: secrets.google.clientSecret,
        callbackURL: "http://localhost:4000/api/v1/login/google/redirect"
    }, (accessToken, refreshToken, profile, cb) => {


        let user = {
            name: profile.displayName,
            picture: profile.photos[0].value,
            grant: false
        };

        models.Admin.findOrCreate({
            where: {
                googleId: profile.id
            },
            defaults: user
        }).then((user) => {
            cb(null, user[0]);
        });
    }
));

module.exports = passport;