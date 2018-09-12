var db = require('./firebase/firebaseInit').db;


function createContact(uid, params) {
    //console.log("params", params)
    contactParam = Object.assign({}, params, {uid: uid});
    //console.log(contactParam);
    //console.log("here");
    return db.collection("contacts").add(contactParam)
        .then(function(docRef) {
            return Object.assign({}, contactParam, {id: docRef.id});
        })
}

function listContacts(uid) {
    return db.collection("contacts").where('uid', '==', uid).get()
        .then(snapshot => {
            //console.log("got here", snapshot)
            var data = [];
            snapshot.forEach(doc => {
                //console.log("doc", doc)
                data.push(Object.assign({}, doc.data(), {id: doc.id}))
            })
            return data;
        })
}


function retrieveContact(contactId) {
    //console.log("contactId", contactId);
    return db.collection("contacts").doc(contactId).get()
             .then(doc => {
                 if (!doc.exists) {
                    console.log("doc does not exist")
                    return undefined;
                 }
                 return Object.assign({}, doc.data(), {id: contactId});
             })           
}

function deleteContact(contactId) {
    return db.collection("contacts").doc(contactId).delete();             
}

function updateCountact(contactId, params){
    // data belongs to the user. return data
   
    return db.collection('contacts').doc(contactId).update(params);
}




module.exports = {
    listContacts: listContacts,
    retrieveContact: retrieveContact,
    deleteContact: deleteContact,
    updateCountact: updateCountact,
    createContact: createContact,
}