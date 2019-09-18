const router = require('express').Router();

router.use('/api', require('./estadios'));
router.use('/api', require('./jugadores'));
router.use('/api', require('./tipoEvento'));

module.exports = router;
