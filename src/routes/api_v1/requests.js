const router = require('express').Router(),
    db = require('../../db'),
    models = require('../../db/models'),
    utils = require('../../utils');

// Authentication handled in index file

router.get('/', (req, res) => db.actions.requests.find().then(data => res.send(data)));

router.post('/new', (req, res) => {
    let email = {email: req.body.email};
    db.actions.requests.findOrCreate(email, email).then(data => {
        res.send(data);
    });
});

router.delete('/:email', (req, res) => {
    db.actions.requests.remove({email: req.params.email})
        .then(data => res.sendStatus(200)).catch(err => res.sendStatus(501));
});

router.put('/super/:email', (req, res) => {

//     find admin by email and update to superAdmin
    models.Admin.update({grant: true}, {
        where: {
            email: req.params.email
        }
    }).then(data => res.sendStatus(200))
        .catch(err => res.sendStatus(501));
});


module.exports = router;