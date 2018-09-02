//signin page
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// todo 
// custom passport deal with json post from 
// frontend to verify the user in the database
// and redirect to the repect page depends on the result of authentication
// the page switch (redirect) behavior is done by backend 
// UNSOLVED: redirect here doesn't work, get request generated but doesn't go the corresponding page
// might need some trigger to finish the redirect???
/*
router.post('/signin', passport.authenticate('local',{
	successRedirect: 'user',
	failureRedirect: 'user'

}));
*/

// another approach on verifiction, custom a verification logic with database
// return a verification to frontend, 'true' or 'false' must be string!
router.post('/signin', function(req, res, next) {
	res.end('true');
})

router.get('/signup', function(req, res, next) {
  res.render('signup');
});



module.exports = router;
