import IStudentModel = require('./interfaces/StudentModel');

class StudentModel {

    private _studentModel: IStudentModel;

    constructor(studentModel: IStudentModel) {
        this._studentModel = studentModel;
    }
    get firstName (): string {
        return this._studentModel.firstName;
    }

    get lastName (): string {
        return this._studentModel.lastName;
    }

    get studentNumber (): number {
        return this._studentModel.studentNumber;
    }

}
Object.seal(StudentModel);
export =  StudentModel;
