/**
 * This file defines API endpoints. All these urls serve JSON
 */

var router = require('express').Router();
var auth = require('../modules/auth');
var resources = require('../modules/resources');
var validateForm = require('../utils/formvalidator');
var trimObject = require('../utils/objectMethods').trimObject;

function notAuthenticated(req) {
    return req.user === undefined;
}

// ---- Authentication Endpoints --------//

router.post('/auth/signup', function (req, res) {
    /*
     * Expects email, password, and displayName in the request body
     * Returns error codes if fails, following firebase's specs
     */ 
    
    auth.registerUser(req.body.email, req.body.password, req.displayName)
        .then(function (data) {
            //console.log("signup success");
            console.log("data", data);
            res.send("User created.");
        })
        .catch(function(err) {
            //console.log("signup failed");
            //console.log("error code", err.code);
            //console.log("message:", err.message);
            let response = {
                error: err.code,
                message: err.message
            }
            res.json(response);
        })
})

router.post('/auth/signin', function (req, res) {
    // returns token
    auth.signUserIn(req.body.email, req.body.password)
        .then(function(userData) {
            //console.log('user data post-sign in', userData);
            res.json(userData);
        })
        .catch(function(err) {
            //console.log(err)
            res.status(401).send('Could not sign in. User not found');
        })
})

router.post('/auth/signout', function (req, res) {
    // not sure if it is needed -- all client needs to do is lose the token
})

router.post('/auth/checkemail', function (req, res) {
    // Not needed, as one only registers with one's own email

})


//----- Resource ENDPOINTS ----------//

router.route('/user')
    .get(function (req, res){
        // the signin endpoint  already returns user data
        // so this is not priority
    })
    .put(function (req, res){

    })

router.route('/contacts')
    .get(function (req, res){
        if (notAuthenticated(req)) return res.status(403).send("Forbidden. You must sign in.")

        resources.listContacts(req.user.uid)
            .then(contacts => {
                return res.json(contacts);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send("Server error");
            });
    })
    .post(function (req, res){
        if (notAuthenticated(req)) return res.status(403).send("Forbidden. You must sign in.")
        // create contact   
        resources.createContact(req.user.uid, {
            address: req.body.Address,
            email: req.body.Email,
            isFavorite: req.body.IsFavorite,
            name: req.body.Name,
            phoneNumber: req.body.PhoneNumber,    
        })
        .then(function(params) {
            return res.json(params);
        })
        .catch(function(err) {
            return res.status(400).send("Could not create contact. Check parameters");
        })
    })

router.route('/contacts/:id')
    
    .get(function (req, res){
        if (notAuthenticated(req)) return res.status(403).send("Forbidden. You must sign in.")

        console.log("contact id: ",req.params.id);
        resources.retrieveContact(req.params.id)
            .then(data => {
 
                // if no data is found or if the contact does not belong to the user making the request,
                // return contact not found (for security reasons)
                if (!data || data.uid != req.user.uid) return res.status(404).send("Contact not found");
                
                // data belongs to the user. return data
                return res.json(data);
            })
            .catch(error => {
                return res.status(500).send("An error occurred");
            })

    })
    .put(function (req, res){
        if (notAuthenticated(req)) return res.status(403).send("Forbidden. You must sign in.")
        
        var modelFields = ['email', 'address', 'name', 'phoneNumber', 'isFavorite'];

        var form = validateForm(res.body, modelFields, [])
        


        // check if form is invalid
        if (!form.isValid){
            if (form.anyFieldRejected)
                return res.status(400).send("These fields are not allowed: " + form.rejectedFields.toString());
            
            return res.status(400).send("These required fields are missing " + form.missingFields.toString());
        }
            
        console.log(req.body)
        var params = trimObject(req.body, modelFields);
        console.log("params", params)

        resources.retrieveContact(req.params.id)
            .then(data => {
 
                // if no data is found or if the contact does not belong to the user making the request,
                // return contact not found (for security reasons)
                if (!data || data.uid != req.user.uid) return res.status(404).send("Contact not found");
                
                console.log("params", params);
                // data belongs to the user. return data
                return resources.updateCountact(req.params.id, params)
                    .then(() => {
                        return res.json(Object.assign({}, data, params));
                    })
                    

            })
            .catch(error => {
                console.log("error in updating contact", error);
                return res.status(500).send("An error occurred");
            })
        
        
        // update fields
        

    })
    .delete(function (req, res){
        if (notAuthenticated(req)) return res.status(403).send("Forbidden. You must sign in.")
        resources.retrieveContact(req.params.id)
            .then(data => {
              
                if (!data || data.uid != req.user.uid) {
                    return res.status(404).send("object not found");
                }
                resources.deleteContact(req.params.id)
                    .then(() => {
                        return res.send("object deleted");
                    })
                    .catch(err=>{
                        console.log("error", err);
                        return res.status(500).send("An error occurred");
                    })
            })
            .catch(error => {
                console.log(error);
                return res.status(404).send("Resource not found");
            })

    })


    router.use(function (err, req, res, next) {
        // middleware for logging errors
        if (err) {
          console.log('Error', err);
        } else {
          console.log('404')
        }
      });
module.exports = router