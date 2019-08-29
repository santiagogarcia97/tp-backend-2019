const router = require('express').Router();

router.use(require('./estadiosGetAll'));
router.use(require('./estadiosGetById'));
router.use(require('./estadiosCreate'));
router.use(require('./estadiosUpdate'));

module.exports = router;
