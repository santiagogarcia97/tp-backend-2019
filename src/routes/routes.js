const router = require('express').Router();

router.use('/equipos', require('./equipos/index'));
router.use('/jugadores', require('./jugadores/index'));

module.exports = router;
