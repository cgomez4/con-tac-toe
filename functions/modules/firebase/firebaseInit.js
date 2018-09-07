/**
 *  Initializes both firebase-admin and firebase-client sdks. You always want to use
 *  the firebase and admin exports from this file, instead of initializing them in every
 *  module.
 */

var firebase = require('firebase') // for client sdk -- sign in, out, register
var admin = require("firebase-admin");

const config = {
    apiKey: "AIzaSyCOIw-jXibG6hzJ_4G0TFk67S3hoUP_va4",
    authDomain: "con-tac-toe.firebaseapp.com",
    databaseURL: "https://con-tac-toe.firebaseio.com",
    projectId: "con-tac-toe",
    storageBucket: "con-tac-toe.appspot.com",
    messagingSenderId: "1010375995617"
};

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://con-tac-toe.firebaseio.com"
});

firebase.initializeApp(config);
var firestore = firebase.firestore()
firestore.settings({timestampsInSnapshots: true});

module.exports = {
    firebase: firebase,
    admin: admin,
    db: firestore
};