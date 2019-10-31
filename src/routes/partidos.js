const router = require('express').Router();
const ctrlPartidos = require('../controllers/partidos');

router.post('/partidos', ctrlPartidos.create);
router.delete('/partidos/:id', ctrlPartidos.delete);
router.get('/partidos', ctrlPartidos.getAll);
router.get('/partidos/:id', ctrlPartidos.getById);
//router.put('/partidos/:id', ctrlPartidos.update);

module.exports = router;
