var express = require('express');
var router = express.Router();

router.get('/fetchAllProducts', (req,res) =>{
  console.log('fetched');
  res.send({
    message: 'Your user was registered! Have fun!'
  });
});

module.exports = router;