const router = require('express').Router();
const ctrlEstadio = require('../controllers/estadios');

router.post('/estadios', ctrlEstadio.create);
router.get('/estadios', ctrlEstadio.getAll);
router.get('/estadios/:id', ctrlEstadio.getById);
router.put('/estadios/:id', ctrlEstadio.update);
router.delete('/estadios/:id', ctrlEstadio.delete);

module.exports = router;
