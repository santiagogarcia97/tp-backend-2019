const router = require('express').Router();
const ctrlEquipos = require('../controllers/equipos');

router.post('/equipos', ctrlEquipos.create);
/*
router.get('/dts', ctrlDts.getAll);
router.get('/dts/:id', ctrlDts.getById);
router.put('/dts/:id', ctrlDts.update);
router.delete('/dts/:id', ctrlDts.delete);


 */
module.exports = router;
