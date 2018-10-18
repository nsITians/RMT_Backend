/**
 * Created by tech4GT on 9/30/18.
 */
const router = require('express').Router(),
    acl = require('../../utils/acl');

router.use('/posts', require('./posts'));
router.use('/teachers', require('./teachers'));
router.use('/courses', require('./courses'));
router.use('/login', require('./login'));
router.use('/requests'
    , acl.ensureAdmin
    , acl.ensureSuperAdmin
    , require('./requests'));

module.exports = router;
