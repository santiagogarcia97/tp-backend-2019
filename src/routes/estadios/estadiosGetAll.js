const express = require('express');
const mongoose = require('mongoose');
const estadio = mongoose.model('estadio');
const router = express.Router();

// GET ALL
router.get('/', (req, res) => {
    estadio.find().
    exec( (err, result) => {
        if (err) {
            res.send(err);
        }
        else if (result.length != 0) {
            res.json(result);
        }
        else {
            res.json("No existe ningún estadio");
        }
    });
});

module.exports = router;
