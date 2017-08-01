import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
const sql = require('mssql');
var auth = ["Admin"];

const config = {
    user: 'NickRowlandson',
    password: 'georgianTest1',
    server: 'nr-comp2007.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'GeorgianApp',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

class CourseController {

    // select
    retrieve(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query(`
SELECT course.*,concat(concat(staff.firstName,' '),staff.lastName)[professorName],campusName FROM Course
left join users on users.userID=course.professorId
left join campus on campus.campusId = course.campusId
left join staff on staff.userID = course.professorId`)
                                .then(function(recordset) {
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Select all course " + err);
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error in your request" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    getInstructorCourses(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Instructor"], done: function() {
                    var _id: string = req.params._id;

                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("SELECT * FROM Course WHERE professorId = '" + _id + "'")
                                .then(function(recordset) {
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" }); console.log("Select instructor course " + err);
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error in your request" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;

                    sql.connect(config).then(() => {
                        return sql.query`DELETE FROM Course WHERE courseID = ${_id}`
                    }).then(result => {
                        console.dir("sucess");
                        res.send({ "success": "success" });
                    }).catch(err => {
                        // ... error checks
                        res.send({ "error": "error" });
                        console.log("delete course" + err)
                    })

                    sql.on('error', err => {
                        // ... error handler
                        console.log(err);
                        res.send({ "error": "error in your request" });
                    })

                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var course = req.body;
                    var _id: string = req.params._id;
                    sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
                        new sql.Request().query(`UPDATE Course SET courseName='${course.courseName}', classroom='${course.classroom}',campusId='${course.campusId}',professorId='${course.professorId}'
                          WHERE courseID =${_id};`).then(function() {
                                res.send({ "success": "success" });
                            }).catch(function(err) {
                                res.send({ "error": "error" }); console.log("Update course " + err);
                            });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error in your request" });
                    });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query(`SELECT course.*,username[professorName],campusName FROM Course
left join users on users.userID=course.professorId
left join campus on campus.campusId = course.campusId
 where courseId=${_id}`)
                                .then(function(recordset) {
                                    console.dir(recordset);
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    // insert
    create(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {

                    // get course from req url
                    var course = req.body;

                    sql.connect(config).then(() => {
                        return sql.query`INSERT INTO Course (courseName, professorId, campusId, classroom, courseStart, courseEnd, classDay, classStartTime, classEndTime)
                          VALUES(${course.courseName}, ${course.professorId}, ${course.campusId}, ${course.classroom}, ${course.courseStart}, ${course.courseEnd}, ${course.classDay}, ${course.classStartTime}, ${course.classEndTime})`
                    }).then(result => {
                        console.dir(`insert ${course.courseName} complete`);
                        res.send({ "success": "success" });
                    }).catch(err => {
                        // ... error checks
                        res.send({ "error": "error" });
                        console.log("insert course " + err)
                    })

                    sql.on('error', err => {
                        // ... error handler
                        console.log(err);
                        res.send({ "error": "error in your request" });
                    })
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }
    getCampuses(req: express.Request, res: express.Response): void {
        try {

            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {

                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query(`SELECT * FROM campus`)
                                .then(function(recordset) {
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    getProfessor(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {

                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query(`
 SELECT users.*,concat(concat(staff.firstName,' '),staff.lastName)[professorName] FROM users
 left join  staff on staff.userID = users.userID
 where userType='instructor'`)
                                .then(function(recordset) {
                                    // console.dir(recordset)
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                });
                        }).catch(function(err) {
                            console.log(err);
                            res.send({ "error": "error" });
                        });
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

}

export = CourseController;
