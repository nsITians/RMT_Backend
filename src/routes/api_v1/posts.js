/**
 * Created by tech4GT on 9/30/18.
 */
const router = require('express').Router(),
    actions = require('../../db/index').actions;


router.post('/new',(req,res)=>{
    const data = req.body;
    actions.posts.add(data).then(data=>res.send(data));
});

router.get('/',require('../../auth/jwt/passport').authenticate('jwt',{session: false}),(req,res)=>{
    const filterCriteria = req.query;
    console.log("hdhvoihsdoivh");
    actions.posts.find(filterCriteria).then(data=> res.send(data));
});

router.get('/:id',(req,res)=>{
    const criteria = {
        id: req.params.id
    };
    actions.posts.find(criteria).then(data=>res.send(data[0]));
});

router.put('/:id',(req,res)=>{
    const criteria = {
        id: req.params.id
    },data = req.body;
    actions.posts.edit(criteria,data).then(data=>{
        if(data[0] == 1){
            actions.posts.find(criteria).then(result=>res.send(result[0]));
        } else {
            res.send({"success": false});
        }
    });
});

router.delete('/:id',(req,res)=>{
    const criteria = {
        id: req.params.id
    };
    actions.posts.find(criteria).then(result=>{
        actions.posts.remove(criteria).then(data=>res.send((data==1)?result[0]:{"success": false}));
    });
});

module.exports = router;