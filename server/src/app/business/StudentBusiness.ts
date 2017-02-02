import StudentRepository = require("./../repository/StudentRepository");
import IStudentBusiness = require("./interfaces/StudentBusiness");
import IStudentModel = require("./../model/interfaces/StudentModel");
import StudentModel = require("./../model/StudentModel");


class StudentBusiness implements IStudentBusiness {
    private _studentRepository: StudentRepository;

    constructor () {
        this._studentRepository = new StudentRepository();
    }

    create (item: IStudentModel, callback: (error: any, result: any) => void) {
        this._studentRepository.create(item, callback);
    }

    retrieve (callback: (error: any, result: any) => void) {
        this._studentRepository.retrieve(callback);
    }

    update (_id: string, item: IStudentModel, callback: (error: any, result: any) => void) {

        this._studentRepository.findById(_id, (err, res) => {
            if(err) callback(err, res);

            else
                this._studentRepository.update(res._id, item, callback);

        });
    }

    delete (_id: string, callback:(error: any, result: any) => void) {
        this._studentRepository.delete(_id , callback);
    }

    findById (_id: string, callback: (error: any, result: IStudentModel) => void) {
        this._studentRepository.findById(_id, callback);
    }

}


Object.seal(StudentBusiness);
export = StudentBusiness;
