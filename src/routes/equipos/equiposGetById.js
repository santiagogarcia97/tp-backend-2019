const express = require('express');
const mongoose = require('mongoose');
const equipo = mongoose.model('equipo');
const router = express.Router();

//GET ONE
router.get('/:id', (req, res) => {
    equipo.findOne({_id: req.params.id}).
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
