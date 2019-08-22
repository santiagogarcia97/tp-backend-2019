const router = require('express').Router();

router.use('/equipo', require('./equipo/index'));

module.exports = router;
