"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StudentSchema = require("./../dataAccess/schemas/StudentSchema");
var RepositoryBase = require("./BaseRepository");
var StudentRepository = (function (_super) {
    __extends(StudentRepository, _super);
    function StudentRepository() {
        return _super.call(this, StudentSchema) || this;
    }
    return StudentRepository;
}(RepositoryBase));
Object.seal(StudentRepository);
module.exports = StudentRepository;
//# sourceMappingURL=StudentRepository.js.map