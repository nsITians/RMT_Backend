/**
 * Created by tech4GT on 9/30/18.
 */
const router = require('express').Router(),
    acl = require('../../utils/acl')
    actions = require('../../db/index').actions;


router.post('/new',acl.ensureAdmin,(req,res)=>{
   const data = req.body;
   actions.teachers.add(data).then(data=>res.send(data));
});

router.get('/',(req,res)=>{
    const filterCriteria = req.query;
   actions.teachers.find(filterCriteria).then(data=> res.send(data));
});

router.get('/:id',(req,res)=>{
    const criteria = {
        id: req.params.id
    };
    actions.teachers.find(criteria).then(data=>res.send(data[0]));
});

router.put('/:id',acl.ensureAdmin,(req,res)=>{
    const criteria = {
        id: req.params.id
    },data = req.body;
    actions.teachers.edit(criteria,data).then(data=>{
        if(data[0] == 1){
            actions.teachers.find(criteria).then(result=>res.send(result[0]));
        } else {
            res.send({"success": false});
        }
    });
});

router.delete('/:id',acl.ensureAdmin,(req,res)=>{
    const criteria = {
        id: req.params.id
    };
    actions.teachers.find(criteria).then(result=>{
        actions.teachers.remove(criteria).then(data=>res.send((data==1)?result[0]:{"success": false}));
    });
});

module.exports = router;
