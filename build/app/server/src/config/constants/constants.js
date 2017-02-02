System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Constants;
    return {
        setters: [],
        execute: function () {
            Constants = (function () {
                function Constants() {
                }
                return Constants;
            }());
            Constants.DB_CONNECTION_STRING = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mmongodb://Greybush:greenbum1@ds054999.mlab.com:54999/georgianapp";
            Object.seal(Constants);
            exports_1("default", Constants);
        }
    };
});
//# sourceMappingURL=constants.js.map