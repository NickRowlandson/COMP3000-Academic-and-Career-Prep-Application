import express = require("express");
import StudentBusiness = require("./../app/business/StudentBusiness");
import IBaseController = require("./BaseController");
import IStudentModel = require("./../app/model/interfaces/StudentModel");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');

class StudentController implements IBaseController <StudentBusiness> {

    create(req: express.Request, res: express.Response): void {
        try {
            var salt = bcrypt.genSaltSync(10);
            var password: IStudentModel = <IStudentModel>req.body.password;
            // Hash the password with the salt
            password = bcrypt.hashSync(password, salt);
            req.body.password = password;
            var student: IStudentModel = <IStudentModel>req.body;
            var studentBusiness = new StudentBusiness();
            studentBusiness.create(student, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    update(req: express.Request, res: express.Response): void {
        try {
            var student: IStudentModel = <IStudentModel>req.body;
            var _id: string = req.params._id;
            var studentBusiness = new StudentBusiness();
            studentBusiness.update(_id, student, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    delete(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var studentBusiness = new StudentBusiness();
            studentBusiness.delete(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send({"success": "success"});
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    retrieve(req: express.Request, res: express.Response): void {
        try {

            var studentBusiness = new StudentBusiness();
            studentBusiness.retrieve((error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
    findById(req: express.Request, res: express.Response): void {
        try {

            var _id: string = req.params._id;
            var studentBusiness = new StudentBusiness();
            studentBusiness.findById(_id, (error, result) => {
                if(error) res.send({"error": "error"});
                else res.send(result);
            });
        }
        catch (e)  {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
}
export = StudentController;
