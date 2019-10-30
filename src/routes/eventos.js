const router = require('express').Router();
const ctrlEventos = require('../controllers/eventos');

router.post('/eventos', ctrlEventos.create);
//router.delete('/eventos/:id', ctrlEventos.delete);
router.get('/eventos', ctrlEventos.getAll);
router.get('/eventos/:id', ctrlEventos.getById);
//router.put('/eventos/:id', ctrlEventos.update);

module.exports = router;
