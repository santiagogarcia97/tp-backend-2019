const express = require('express');
const mongoose = require('mongoose');
const estadio = mongoose.model('estadio');
const router = express.Router();

router.put('/:id', (req, res) => {
    estadio.findById(req.params.id).
        exec((err, result) => {
        if (err) {
            res.send(err);
        }
        else if (result) {
            result.nombre = req.body.nombre || result.nombre;
            result.direccion = req.body.direccion || result.direccion;
            result.save((err, result) => {
                if(err) {
                    res.send(err)
                }
                else {
                    res.send("Estadio modificado con éxito");
                }
            });
        }
        else {
            res.send("El estadio que quiere modificar no existe");
        }
    });
});

module.exports = router;
