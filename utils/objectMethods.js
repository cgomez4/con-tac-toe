function trimObject(obj, fieldList) {
    /**
     * Given an object and a fieldList, return a new object with
     * only the fields contained in fieldList
     */
     var newObj = {};

     fieldList.forEach((field) => {
        if (obj[field] !== undefined)
            newObj[field] = obj[field]
     });
     return newObj
}

module.exports = {
    trimObject: trimObject,
}