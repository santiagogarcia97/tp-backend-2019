const express = require('express');
const mongoose = require('mongoose');
const tipoEvento = mongoose.model('tipoEvento');
const router = express.Router();

// GET ALL
router.get('/', (req, res) => {
    tipoEvento.find().
    exec( (err, result) => {
        if (err) {
            res.send(err);
        }
        else if (result.length != 0) {
            res.json(result);
        }
        else {
            res.json("No existe ningún tipoEvento");
        }
    });
});

module.exports = router;
