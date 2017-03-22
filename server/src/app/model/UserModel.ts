import IUserModel = require('./interfaces/UserModel');

class UserModel {

    private _userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._userModel = userModel;
    }

    get userName (): string {
        return this._userModel.username;
    }

    get password (): string {
        return this._userModel.password;
    }

    get firstName (): string {
        return this._userModel.firstName;
    }

    get lastName (): string {
        return this._userModel.lastName;
    }

    get email (): string {
        return this._userModel.email;
    }

}
Object.seal(UserModel);
export =  UserModel;
