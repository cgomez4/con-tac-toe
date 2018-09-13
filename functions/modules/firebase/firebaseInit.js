/**
 *  Initializes both firebase-admin and firebase-client sdks. You always want to use
 *  the firebase and admin exports from this file, instead of initializing them in every
 *  module.
 */

var firebase = require('firebase') // for client sdk -- sign in, out, register
var admin = require("firebase-admin");

const config = {
  apiKey: "AIzaSyCix79vGcsR34w5QNhNMfSEs9RltwLEGuA",
  authDomain: "con-tac-toe2.firebaseapp.com",
  databaseURL: "https://con-tac-toe2.firebaseio.com",
  projectId: "con-tac-toe2",
  storageBucket: "con-tac-toe2.appspot.com",
  messagingSenderId: "104103454652"
};

var serviceAccount = require("./ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://con-tac-toe2.firebaseio.com"
});

firebase.initializeApp(config);
var firestore = firebase.firestore()
firestore.settings({timestampsInSnapshots: true});

module.exports = {
    firebase: firebase,
    admin: admin,
    db: firestore
};
