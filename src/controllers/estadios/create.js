const { validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const estadio = mongoose.model('estadio');

module.exports = async (req, res, next) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { nombre, direccion } = req.body;

        const estadioNew = new estadio({
            nombre,
            direccion
        });

        await estadioNew.save((err, result) => {
            if(err){
                res.json({message: 'Error al intentar guardar el estadio', error: err});
            }
            else{
                res.json({ message: 'Estadio agregado con exito', data: result });
            }
        });
    } catch(err) {
        return next(err)
    }
}
