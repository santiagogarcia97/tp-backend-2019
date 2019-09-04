const router = require('express').Router();
const ctrlJugadores = require("../controllers/jugadores");

router.post('/jugadores', ctrlJugadores.create);
router.get('/jugadores', ctrlJugadores.getAll);
router.get('/jugadores/:id', ctrlJugadores.getById);
router.put('/jugadores/:id', ctrlJugadores.update);
router.delete('/jugadores/:id', ctrlJugadores.delete);

module.exports = router;
