/**
 * 
 * Validates that object has required field
 * 
 */

function validateForm(parsedBody, allowedFields, requiredFields) {
    // validates form in object form against a lsit of required fields and
    // one of allowedFields

    var rejectedFields = [];
    for (var key in parsedBody) {
        // if request contained fields other than allowed
        if (allowedFields.indexOf(key) === -1)
            rejectedFields.push(req.body[key]);
    }
    
    var missingFields = []
    for (var field in requiredFields){
        if (parsedBody[field] === undefined)
            missingFields.push(field);
    }

    return {
        anyFieldRejected: (rejectedFields.length > 0),
        rejectedFields: rejectedFields,

        anyReqFieldMissing: (missingFields.length > 0),
        missingFields: missingFields,

        isValid: (rejectedFields.length === 0 && missingFields.length === 0)
    };
}

module.exports = validateForm;