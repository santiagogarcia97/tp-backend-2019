const express = require('express');
const mongoose = require('mongoose');
const estadio = mongoose.model('estadio');
const router = express.Router();

// GET ALL
router.get('/:id', (req, res) => {
    estadio.findById(req.params.id).
    exec((err, result) => {
        if (err) {
            res.send(err);
        }
        else if(result != null) {
            res.json(result);
        }
        else {
            res.json("No existe el equipo buscado");
        }
    });
});

module.exports = router;
