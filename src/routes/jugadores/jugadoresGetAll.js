const express = require('express');
const mongoose = require('mongoose');
const jugador = mongoose.model('jugador');
const router = express.Router();

// GET ALL
router.get('/', (req, res) => {
    jugador.find().
    exec( (err, result) => {
        if (err) {
            res.send(err);
        }
        else if (result.length != 0) {
            res.json(result);
        }
        else {
            res.json("No existe ningún jugador");
        }
    });
});

module.exports = router;
