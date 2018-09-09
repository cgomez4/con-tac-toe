/**
 * This file defines all URLS that serve html files
 */


var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/signup', function(req, res) {
    res.render('signup');
})

router.get('/user', function(req, res) {
    res.render('user');
})

module.exports = router