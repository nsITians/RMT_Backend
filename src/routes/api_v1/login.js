const router = require('express').Router(),
    passport = require('../../auth/google/passport'),
    jwt = require('jsonwebtoken'),
    secrets = require('../../../config/secrets');

router.get('/google', passport.authenticate('google', {scope: ['profile','email']}));

router.get('/google/redirect',
    passport.authenticate('google', {failureRedirect: '/api/v1/login/failiure'}),
    function (req, res) {

        if (!!req.user) {
            const token = jwt.sign(req.user.dataValues, secrets.jwt.secret, {
                expiresIn: 7 * 24 * 60 * 60
            });
            // res.json({success: true, token: `Bearer ${token}`});
            res.redirect(`${secrets.frontend.url}/login/?token=${token}`)
        } else res.sendStatus(401);
    });

router.get('/failiure', (req, res) => res.sendStatus(403));


module.exports = router;