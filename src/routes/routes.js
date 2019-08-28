const router = require('express').Router();

router.use('/equipos', require('./equipos'));
router.use('/jugadores', require('./jugadores'));


module.exports = router;
