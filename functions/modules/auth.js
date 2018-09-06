/**
 * These methods encapsulates FireBase SDK. We do not want to call fb sdk 
 * on our views, as we might want to change underlying implementation.
 * 
 * Virtually all sdk methods return promises, which is the standard for node;
 * thus, reading the Firebase doc is very important. 
 */

var admin = require('./firebase/firebaseInit').admin;
var firebase = require('./firebase/firebaseInit').firebase;
var db = require('./firebase/firebaseInit').db;


function postSignUpCreateUser(user) {
    // add user to db by user ID -- triggered after signup

    var compactUserData = {
        uid: user.uid,
        email: user.email,
        displayName: (!user.displayName)? "unkown" : user.displayName,
    }
    return db.collection("users").doc(user.uid).set(compactUserData)
            .then(function() {
                console.log("data record for new user created on DB!");
                return compactUserData;  
    })

}


function registerUser(email, password, displayName) {
    return admin.auth().createUser({
        email: email,
        password: password,
        displayName: displayName,
      }).then(function(userRecord) {
        return postSignUpCreateUser(userRecord);
      })
}

function establishUserIdentity(token) {
    return admin.auth().verifyIdToken(token);
}

function signUserIn(email, password) {
    // signs user in and, if succeeds, returns basic user information, including a token for further requests
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(signInData) {
            return {
                id: signInData.user.uid,
                email: signInData.user.email,
                displayName: signInData.user.displayName,
            };
        })
        .then(function(userData) {
            return firebase.auth().currentUser.getIdToken(true)
                .then(function(token) {
                    userData.token = token
                    return userData;
                })
        })
}

function signUserOut(token) {
    // signs user out -- not sure if needed (client can just lose token)
    var token = ""

    return token;
}

module.exports = {
    establishUserIdentity: establishUserIdentity,
    signUserIn: signUserIn,
    registerUser: registerUser
}