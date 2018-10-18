const passport = require('passport'),
    googleStrategy = require('passport-google-oauth20').Strategy,
    log = require('debug')('server:authentication'),
    secrets = require('../../../config/secrets'),
    models = require('../../db/models');


passport.serializeUser(function (user, done) {
    !!user ? done(null, user.id) : done(null, 0);
});

passport.deserializeUser(function (id, done) {
    models.Admin.findOne({
        where: {
            id
        }
    }).then(user => {
        done(null, user)
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
            googleId: profile.id,
            email: profile.emails[0].value,
            grant: false
        };

        models.Admin.findAndCountAll().then(data => {

            if (data.count === 0) {
                log("first user");
                createUser();
            }
            else {
                console.log("not first user");
                models.Admin.findOne({
                    where: {
                        googleId: profile.id
                    }
                }).then(user => {
                    if (!user) {
                        //Check if request exists
                        models.Request.destroy({
                            where: {
                                email: profile.emails[0].value
                            }
                        }).then(num => {
                            if (num > 0)
                                createUser();
                            else
                                cb(null,user);
                        });
                    }
                    else {
                        console.log("Welcome back user!");
                        cb(null,user);
                    }
                });
            }
        });
        function createUser(){
            models.Admin.create(user).then((user) => {
                cb(null, user);
            });
        }
    }
));

module.exports = passport;