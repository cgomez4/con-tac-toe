/**
 * This file defines all URLS that serve html files
 */

 var express = require('express')
 var router = express.Router()

 router.get('/signin', function(req, res){
     res.render('signin');
 });

 router.get('/signup', function(req, res){
     res.render('signup');
 })

 router.get('/contacts', function(req, res)){
     res.render('contacts');
 }

 module.exports = router
