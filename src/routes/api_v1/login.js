const router = require('express').Router(),
    passport = require('../../auth/google/passport'),
    jwt = require('jsonwebtoken'),
    secrets = require('../../../config/secrets');

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/redirect',
    passport.authenticate('google', {failureRedirect: '/login/failiure'}),
    function (req, res) {
        const token = jwt.sign(req.user.dataValues,secrets.jwt.secret, {
            expiresIn: 7 * 24 * 60 * 60
        });
        res.json({success: true,token: `Bearer ${token}`});
    });

router.get('/failiure', (req, res) => res.sendStatus(401));


module.exports = router;