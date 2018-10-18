const passport = require('passport'),
    jwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    secrets = require('../../../config/secrets'),
    models = require('../../db/models');


passport.serializeUser((user, done) => {
    done(null, {id: user.id});
});
passport.deserializeUser((id, done) => {
    models.Admin.findOne({where: {id}}).then(user=>done(null,user));
});


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secrets.jwt.secret
};

passport.use(new jwtStrategy(opts, (payload, done) => {
        console.log(payload.id);
        models.Admin.findOne({
            where: {
                id: payload.id
            }
        }).then(user => !!user ? done(null, user) : done(null, false));
    }
));

module.exports = passport;