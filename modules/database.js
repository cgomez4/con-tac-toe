var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyCOIw-jXibG6hzJ_4G0TFk67S3hoUP_va4",
    authDomain: "con-tac-toe.firebaseapp.com",
    databaseURL: "https://con-tac-toe.firebaseio.com",
    projectId: "con-tac-toe",
    storageBucket: "con-tac-toe.appspot.com",
    messagingSenderId: "1010375995617"
};

firebase.initializeApp(config);
var database = firebase.database();

module.exports = database;