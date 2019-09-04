const router = require('express').Router();

router.use('/api', require('./estadios'));
router.use('/api', require('./jugadores'));

module.exports = router;
