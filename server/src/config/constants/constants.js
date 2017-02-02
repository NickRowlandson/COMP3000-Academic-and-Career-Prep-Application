"use strict";
var Constants = (function () {
    function Constants() {
    }
    return Constants;
}());
Constants.DB_CONNECTION_STRING = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://testUser:test@ds054999.mlab.com:54999/georgianapp";
Object.seal(Constants);
module.exports = Constants;
//# sourceMappingURL=constants.js.map