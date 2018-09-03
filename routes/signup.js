//signup page


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('signup');
});

router.post('/checkunique', function(req, res, next) {
	// todo 
	// verify the username in the database
	
	res.end('true');
});

router.post('/submit', function(req, res, next) {
	// todo
	// add new user to the database
	
	res.end('add user successfully');
});

module.exports = router;
