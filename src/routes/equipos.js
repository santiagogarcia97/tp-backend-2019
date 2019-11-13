const router = require('express').Router();
const ctrlEquipos = require('../controllers/equipos');

router.post('/equipos', ctrlEquipos.create);
router.delete('/equipos/:id', ctrlEquipos.delete);
router.get('/equipos', ctrlEquipos.getAll);
router.get('/equipos/:id', ctrlEquipos.getById);
router.put('/equipos/:id', ctrlEquipos.update);
router.get('/equipos/:id/jugadores', ctrlEquipos.getJugadores);

module.exports = router;
