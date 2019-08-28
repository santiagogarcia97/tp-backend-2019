const express = require('express');
const mongoose = require('mongoose');
const estadio = mongoose.model('estadio');
const router = express.Router();

router.post('/', (req, res) => {
    let nombreNew = req.body.nombre;
    let direccionNew = req.body.direccion;

    let estadioNew = new estadio({
        nombre: nombreNew,
        direccion: direccionNew
    });
    estadioNew.save((err, result) => {
        if(err){
            res.json({message: 'Error al intentar guardar el estadio', error: err});
        }
        else{
            res.json({ message: 'Estadio agregado con exito', data: result });
        }
    });
});

module.exports = router;
