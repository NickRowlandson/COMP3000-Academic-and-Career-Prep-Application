System.register(["./../dataAccess/schemas/StudentSchema", "./BaseRepository"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var StudentSchema, RepositoryBase, StudentRepository;
    return {
        setters: [
            function (StudentSchema_1) {
                StudentSchema = StudentSchema_1;
            },
            function (RepositoryBase_1) {
                RepositoryBase = RepositoryBase_1;
            }
        ],
        execute: function () {
            StudentRepository = (function (_super) {
                __extends(StudentRepository, _super);
                function StudentRepository() {
                    return _super.call(this, StudentSchema) || this;
                }
                return StudentRepository;
            }(RepositoryBase));
            Object.seal(StudentRepository);
            exports_1("default", StudentRepository);
        }
    };
});
//# sourceMappingURL=StudentRepository.js.map