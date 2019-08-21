const express = require('express');
const mongoose = require('mongoose');
const equipo = mongoose.model('equipo');
const router = express.Router();

router.get('/team/:name', (req,res) => {
  res.send(`Team requested = ${req.params.name}`);
});

// GET ALL
router.get('/equipo', (req, res) => {
  equipo.find().
  exec( (err, result) => {
    if (err) {
      res.send(err);
    }
    else if (result.length != 0) {
      res.json(result);
    }
    else {
      res.json("No existe ningún equipo");
    }
  });
});

module.exports = router;
