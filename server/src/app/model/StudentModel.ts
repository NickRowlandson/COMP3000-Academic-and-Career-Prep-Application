import IStudentModel = require('./interfaces/StudentModel');

class StudentModel {

    private _studentModel: IStudentModel;

    constructor(studentModel: IStudentModel) {
        this._studentModel = studentModel;
    }
    get name (): string {
        return this._studentModel.name;
    }

    get power (): string {
        return this._studentModel.power;
    }

    get amountPeopleSaved (): number {
        return this._studentModel.amountPeopleSaved;
    }

}
Object.seal(StudentModel);
export =  StudentModel;
