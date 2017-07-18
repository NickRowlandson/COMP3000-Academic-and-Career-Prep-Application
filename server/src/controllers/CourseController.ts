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
                          .query('SELECT * FROM Course')
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
                        new sql.Request().query("UPDATE Course SET courseName='" + course.courseName + "', classroom='" + course.classroom + "' WHERE courseID = '" + _id + "'").then(function() {
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
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;

                    sql.connect(config).then(() => {
                        return sql.query`SELECT * FROM Course where courseId=${_id}`
                    }).then(result => {
                      //  console.dir(result);
                        res.send(result);
                    }).catch(err => {
                        // ... error checks
                        res.send({ "error": "error" });
                        console.log("get course " + err+"for id "+_id)
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


    // insert
    create(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {

                    // get course from req url
                    var course = req.body;

                    sql.connect(config).then(() => {
                        return sql.query`INSERT INTO Course (courseName,professorId,campusId,classroom, courseEnd,courseStart) VALUES(${course.courseName},'225', 'Barrie', ${course.classroom},'2017-05-17 13:00:00','2017-05-17 17:00:00')`
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



}

export = CourseController;
