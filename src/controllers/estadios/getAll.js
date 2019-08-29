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

        await estadio.find().
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
    } catch(err) {
        return next(err)
    }
}
