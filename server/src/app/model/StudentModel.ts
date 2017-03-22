import IStudentModel = require('./interfaces/StudentModel');

class StudentModel {

    private _studentModel: IStudentModel;

    constructor(studentModel: IStudentModel) {
        this._studentModel = studentModel;
    }
    get authLevel (): string {
        return this._studentModel.authLevel;
    }
    get enquiryDate (): string {
        return this._studentModel.enquiryDate;
    }
    get username (): string {
        return this._studentModel.username;
    }
    get password (): string {
        return this._studentModel.password;
    }
    get firstName (): string {
        return this._studentModel.firstName;
    }
    get lastName (): string {
        return this._studentModel.lastName;
    }

    get birthday (): string {
        return this._studentModel.birthday;
    }

    get email (): string {
        return this._studentModel.email;
    }

}
Object.seal(StudentModel);
export =  StudentModel;
