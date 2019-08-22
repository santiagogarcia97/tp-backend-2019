const router = require('express').Router();

router.use('/', require('./equipoGetAll'));
router.use('/', require('./equipoGetById'));

module.exports = router;
