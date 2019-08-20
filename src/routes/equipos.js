const express = require('express');
const router = express.Router();

router.get('/team/:name', (req,res) => {
  res.send(`Team requested = ${req.params.name}`);
});

module.exports = router;
