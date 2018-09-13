//contact page
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  	var username = req.body.username;
  	var password = req.body.password;
  	res.end('works');
});

module.exports = router;
