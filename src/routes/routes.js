const router = require('express').Router();

router.use('/equipos', require('./equipos'));
router.use('/jugadores', require('./jugadores'));
router.use('/estadios', require('./estadios'));


module.exports = router;
