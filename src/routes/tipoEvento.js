const router = require('express').Router();
const ctrlTipoEvento = require('../controllers/tipoEvento');

router.post('/tipoevento', ctrlTipoEvento.create);
router.get('/tipoevento', ctrlTipoEvento.getAll);
router.get('/tipoevento/:id', ctrlTipoEvento.getById);
router.put('/tipoevento/:id', ctrlTipoEvento.update);
//router.delete('/tipoevento/:id', ctrlTipoEvento.delete);

module.exports = router;
