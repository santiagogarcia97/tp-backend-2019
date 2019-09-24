const router = require('express').Router();

router.use('/api', require('./estadios'));
router.use('/api', require('./jugadores'));
router.use('/api', require('./tipoEvento'));
router.use('/api', require('./dts'));
router.use('/api', require('./equipos'));

module.exports = router;
