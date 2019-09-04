const router = require('express').Router();
const ctrlJugadores = require("../controllers/jugadores");

router.post('/jugadores', ctrlJugadores.create);
router.get('/jugadores', ctrlJugadores.getAll);
router.get('/jugadores/:id', ctrlJugadores.getById);
//router.put('/estadios/:id', ctrlEstadio.update);
//router.delete('/estadios/:id', ctrlEstadio.delete);

module.exports = router;
