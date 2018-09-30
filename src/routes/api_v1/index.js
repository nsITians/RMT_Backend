/**
 * Created by tech4GT on 9/30/18.
 */
const router = require('express').Router();

router.use('/posts',require('./posts'));
router.use('/teachers',require('./teachers'));

module.exports = router;
