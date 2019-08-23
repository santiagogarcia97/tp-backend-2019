const router = require('express').Router();

router.use(require('./equiposGetAll'));
router.use(require('./equiposGetById'));

module.exports = router;
