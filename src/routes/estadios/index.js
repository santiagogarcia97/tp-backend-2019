const router = require('express').Router();

router.use(require('./estadiosGetAll'));
router.use(require('./estadiosGetById'));
router.use(require('./estadiosCreate'));

module.exports = router;
