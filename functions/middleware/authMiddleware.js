/**
 *  Intercepts all http requests, checks if there is a token in the header
 *  If it does, verify token against firebase, and add user information
 *  to request
 * 
 */

var auth = require("../modules/auth");

function authMiddleware(req, res, next) {
    if (!req.header('bearer')) {
        //console.log("middleware", "token not found");
        req.user = undefined;
        return next();
    }
    token = req.header('bearer');
    //console.log("middleware", "token found!", token);
    auth.establishUserIdentity(token)
        .then(function(validatedUserData) {
            //console.log(validatedUserData);
            req.user = {
                uid: validatedUserData.user_id,
                email: validatedUserData.email,
            }
            return next();
        })
        .catch(function(err) {
            console.log(err);
            req.user = undefined;
            return res.status(404).json({error: "invalid-token", message: "The token is invalid or it may have expired"}); 
        });
}

module.exports = authMiddleware;