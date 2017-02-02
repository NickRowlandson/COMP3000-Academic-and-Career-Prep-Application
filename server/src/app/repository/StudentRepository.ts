import StudentModel = require("./../model/StudentModel");
import IStudentModel = require("./../model/interfaces/StudentModel");
import StudentSchema = require("./../dataAccess/schemas/StudentSchema");
import RepositoryBase = require("./BaseRepository");

class StudentRepository  extends RepositoryBase<IStudentModel> {
    constructor () {
        super(StudentSchema);
    }
}

Object.seal(StudentRepository);
export = StudentRepository;
