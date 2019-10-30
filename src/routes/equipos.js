const router = require('express').Router();
const ctrlEquipos = require('../controllers/equipos');

router.post('/equipos', ctrlEquipos.create);
router.delete('/equipos/:id', ctrlEquipos.delete);
router.get('/equipos', ctrlEquipos.getAll);
router.get('/equipos/:id', ctrlEquipos.getById);
/*

router.put('/dts/:id', ctrlDts.update);
router.delete('/dts/:id', ctrlDts.delete);


 */
module.exports = router;
