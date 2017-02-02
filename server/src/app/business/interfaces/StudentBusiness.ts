import BaseBusiness = require("./../BaseBusiness");
import IStudentModel = require("./../../model/interfaces/StudentModel");

interface StudentBusiness extends BaseBusiness<IStudentModel> {

}
export = StudentBusiness;
