/**
 * Created by tech4GT on 9/30/18.
 */
const router = require('express').Router(),
    actions = require('../../db/index').actions;


router.post('/new',(req,res)=>{
    const data = req.body;
    actions.posts.add(data).then(data=>res.send(data));
});

router.get('/',(req,res)=>{
    const filterCriteria = req.query;
    actions.posts.find(filterCriteria).then(data=> res.send(data));
});

router.get('/:id',(req,res)=>{
    const criteria = {
        id: req.params.id
    };
    actions.posts.find(criteria).then(data=>res.send(data[0]));
});

module.exports = router;