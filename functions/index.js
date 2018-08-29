const functions = require("firebase-functions")
const cors = require("cors")
const express = require("express")
const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyCOIw-jXibG6hzJ_4G0TFk67S3hoUP_va4",
  authDomain: "con-tac-toe.firebaseapp.com",
  databaseURL: "https://con-tac-toe.firebaseio.com",
  projectId: "con-tac-toe",
  storageBucket: "con-tac-toe.appspot.com",
  messagingSenderId: "1010375995617"
};
firebase.initializeApp(config);
var database = firebase.database();
const dbRefObject = database.ref().child('test');
var preObject = "";
dbRefObject.on('value', snap => {
  preObject = JSON.stringify(snap.val(), null, 3);
});
const app = express()
app.use(cors({
  origin: true
}))
app.get("/getTest", (request, response) => {
  response.send(
    preObject
  )
})

app.post("/putTest", (request, response) => {
  dbRefObject.update(request.body);
  response.send(
    request.body
  )
})

const api = functions.https.onRequest(app)

module.exports = {
  api
}
