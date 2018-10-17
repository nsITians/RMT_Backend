const router = require('express').Router(),
    passport = require('../../auth/google/passport'),
    jwt = require('jsonwebtoken'),
    models = require('../../db/models'),
    secrets = require('../../../config/secrets');

router.get('/google', (req, res, next) => {
    let code = req.query.q;
    models.Admin.findAndCountAll().then(data=>{

        if(data.count === 0){
            console.log("first user");
            next();
        }

        else if (!code){
            console.log("no code")
            res.sendStatus(403);
        }

        else{
            console.log("Now destroying request");
            models.Request.destroy({
                where: {
                    code
                }
            }).then(num => {
                console.log(num);
                if (num > 0)
                    next();
                else
                    res.sendStatus(401);
            });
        }
    });
}, passport.authenticate('google', {scope: ['profile']}));

router.get('/google/redirect',
    passport.authenticate('google', {failureRedirect: '/login/failiure'}),
    function (req, res) {
        const token = jwt.sign(req.user.dataValues, secrets.jwt.secret, {
            expiresIn: 7 * 24 * 60 * 60
        });
        res.json({success: true, token: `Bearer ${token}`});
    });

router.get('/failiure', (req, res) => res.sendStatus(401));


module.exports = router;