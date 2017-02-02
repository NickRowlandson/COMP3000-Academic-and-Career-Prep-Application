System.register(["express", "../../controllers/StudentController"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var express, StudentController, router, StudentRoutes;
    return {
        setters: [
            function (express_1) {
                express = express_1;
            },
            function (StudentController_1) {
                StudentController = StudentController_1;
            }
        ],
        execute: function () {
            router = express.Router();
            StudentRoutes = (function () {
                function StudentRoutes() {
                    this._studentController = new StudentController();
                }
                Object.defineProperty(StudentRoutes.prototype, "routes", {
                    get: function () {
                        var controller = this._studentController;
                        router.get("/students", controller.retrieve);
                        router.post("/students", controller.create);
                        router.put("/students/:_id", controller.update);
                        router.get("/students/:_id", controller.findById);
                        router.delete("/students/:_id", controller.delete);
                        return router;
                    },
                    enumerable: true,
                    configurable: true
                });
                return StudentRoutes;
            }());
            Object.seal(StudentRoutes);
            exports_1("default", StudentRoutes);
        }
    };
});
//# sourceMappingURL=StudentRoutes.js.map