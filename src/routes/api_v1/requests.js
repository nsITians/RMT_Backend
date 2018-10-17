const router = require('express').Router(),
    db = require('../../db'),
    utils = require('../../utils'),
    secrets = require('../../../config/secrets');

router.get('/', (req, res) => db.actions.requests.find().then(data=>res.send(data)));

router.post('/new', require('../../auth/jwt/passport').authenticate('jwt', {session: false}), utils.acl.ensureLogin, utils.acl.ensureSuperAdmin, (req, res) => {
    let email = req.body.email, obj = {code: utils.makeString(secrets.code.size)};
    db.actions.requests.findOrCreate({email}, obj).then(data => {
        res.send(`Please check your ${email} for ${secrets.backend.url}/api/v1/login/google/?q=${data[0].code}`);
    });
});


module.exports = router;