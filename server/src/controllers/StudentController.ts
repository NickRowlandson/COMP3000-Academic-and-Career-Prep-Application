import express = require("express");
import jwt = require('jsonwebtoken');
import AuthController = require("../controllers/AuthController");
const PRFService = require("../services/PRFService");
var sql = require('mssql');
var auth = ["Admin", "Staff"];

const config = {
    user: 'NickRowlandson',
    password: 'georgianTest1',
    server: 'nr-comp2007.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'GeorgianApp',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

class StudentController {

    create(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var student = req.body;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("INSERT INTO Students VALUES ('" + student.userID + "','" + student.firstName + "', '" + student.lastName + "','" + student.email + "','" + student.inquiryDate + "','" + student.birthdate + "','" + student.phone + "')")
                                .then(function() {
                                    res.send({ "success": "success" });
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("insert student " + err);
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

    getStudentsById(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {
                    var timetables = req.body;
                    var query = "SELECT * FROM Students WHERE userID =";
                    var count = 0;
                    for (let timetable of timetables) {
                      if(count === 0) {
                        query += " " + timetable.userID;
                      } else {
                        query += " OR userID = " + timetable.userID;
                      }
                      count ++;
                    }
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query(query)
                                .then(function(recordset) {
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Get students by id " + err);
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

    update(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var student = req.body;
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("UPDATE Students SET firstName='" + student.firstName + "', lastName='" + student.lastName + "', birthdate='" + student.birthday + "', email='" + student.email + "', phone='" + student.phone + "' WHERE userID = '" + _id + "'")
                                .then(function(recordset) {
                                    res.send({ "success": "success" });
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Update student " + err);
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

    delete(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("DELETE FROM Students WHERE userID = '" + _id + "'")
                                .then(function() {
                                    new sql.Request(connection)
                                        .query("DELETE FROM Users WHERE userID = '" + _id + "'")
                                        .then(function() {
                                            res.send({ "success": "success" });
                                        }).catch(function(err) {
                                            res.send({ "error": "error" });
                                            console.log("Delete user with id " + _id + ". " + err);
                                        });
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Delete student with id " + _id + ". " + err);
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

    retrieve(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query('SELECT * FROM Students')
                                .then(function(recordset) {
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Get students " + err);
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

    findById(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    var _id: string = req.params._id;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("SELECT *  FROM Students WHERE studentID = '" + _id + "'")
                                .then(function(recordset) {
                                    res.send(recordset[0]);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Get student by id " + err);
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

    addToTimetable(req: express.Request, res: express.Response): void {
        try {
            var _userID = req.params._userID;
            var _courseID = req.params._courseID;
            var _instructorID = req.params._instructorID;
            sql.connect(config)
                .then(function(connection) {
                    new sql.Request(connection)
                        .query("INSERT INTO Timetables (userID,courseID,instructorID) VALUES ('" + _userID + "','" + _courseID + "','" + _instructorID + "')")
                        .then(function() {
                            res.send({ "success": "success" });
                        }).catch(function(err) {
                            res.send({ "error": "error" });
                            console.log("insert into timetable " + err);
                        });
                }).catch(function(err) {
                    console.log(err);
                    res.send({ "error": "error" });
                });
            // new AuthController().authUser(req, res, {
            //     requiredAuth: auth, done: function() {
            //     }
            // });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    removeFromTimetable(req: express.Request, res: express.Response): void {
        try {
            var _userID = req.params._userID;
            var _courseID = req.params._courseID;
            sql.connect(config)
                .then(function(connection) {
                    new sql.Request(connection)
                        .query("DELETE FROM Timetables WHERE userID = ('" + _userID + "') AND courseID = ('" + _courseID + "')")
                        .then(function() {
                            res.send({ "success": "success" });
                        }).catch(function(err) {
                            res.send({ "error": "error" });
                            console.log("remove from timetable " + err);
                        });
                }).catch(function(err) {
                    console.log(err);
                    res.send({ "error": "error" });
                });
            // new AuthController().authUser(req, res, {
            //     requiredAuth: auth, done: function() {
            //     }
            // });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    getTimetables(req: express.Request, res: express.Response): void {
      console.log("Getting Timetables");
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: auth, done: function() {
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("SELECT * FROM Timetables")
                                .then(function(recordset) {
                                    console.log("Success! timetable retrieved");
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Get student timetable " + err);
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

    getTimetablesByCourseId(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Instructor"], done: function() {
                    var _id: string = req.params._courseID;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("SELECT * FROM Timetables WHERE courseID = '" + _id + "'")
                                .then(function(recordset) {
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Get timetables by courseID " + err);
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
   getTimetablesByUserId(req: express.Request, res: express.Response): void {
   try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Student", "Admin", "Staff"], done: function() {
                    var _id: string = req.params.userID;
                        console.log('param userID: '+_id)
                    // sql.connect(config).then(() => {
                    //     return sql.query`select * FROM Timetables WHERE studentId = ${_id}`
                    // }).then(result => {
                    //     console.dir('here is timetable result'+result);
                    //     res.send(result);
                    // }).catch(err => {
                    //     // ... error checks
                    //     res.send({ "error": "error" });
                    //     console.log("select timetable" + err)
                    // })

                    // sql.on('error', err => {
                    //     // ... error handler
                    //     console.log(err);
                    //     res.send({ "error": "error in your request" });
                    // })
 sql.connect(config).then(function(connection) {
                new sql.Request(connection)
                    .query(`select * FROM Timetables WHERE userID = ${_id}`)
                    .then((result)=>{
                  let query='select * from course where';
for (let i=0;i<result.length;i++) {
                      if(i === 0) {
                        query += ' courseId = ' + result[i].courseID;
                      } else {
                        query += " OR courseId = " + result[i].courseID;
                      }
                    }
                      new sql.Request(connection).query(query).then((result)=>{
                        console.log(result);
                        res.send(result);
                      });
                    })
            })
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }


    }

    createNote(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {
                    var caseNote = req.body.caseNote;
                    var _id: string = req.params._studentID;

                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("INSERT INTO CaseNotes VALUES ('" + _id + "', '" + caseNote + "')")
                                .then(function() {
                                    res.send({ "success": "success" });
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("insert note " + err);
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

    getNote(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {
                    var _id: string = req.params._studentID;
                    sql.connect(config)
                        .then(function(connection) {
                            new sql.Request(connection)
                                .query("SELECT *  FROM CaseNotes WHERE studentID = '" + _id + "'")
                                .then(function(recordset) {
                                    res.send(recordset);
                                }).catch(function(err) {
                                    res.send({ "error": "error" });
                                    console.log("Get case note by id " + err);
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

    insertAttendance(req: express.Request, res: express.Response): void {
        try {
            new AuthController().authUser(req, res, {
                requiredAuth: ["Admin", "Staff", "Instructor"], done: function() {
                    var attendance = req.body;
                    var query = "INSERT INTO Attendance (courseID, Date, userID) VALUES ";
                    var count = 0;
                    if(attendance.studentsAbsent.length > 0) {
                      var date = attendance.date;
                      for (let studentID of attendance.studentsAbsent) {
                        if(count === 0) {
                          query += "('" + attendance.courseID + "', '" + date + "', '" + studentID + "' )";
                        } else {
                          query += ", ('" + attendance.courseID + "', '" + date + "', '" + studentID + "' )";
                        }
                        count ++;
                      }
                      console.log(query);
                      sql.connect(config)
                          .then(function(connection) {
                              new sql.Request(connection)
                                  .query(query)
                                  .then(function(recordset) {
                                      // set schedule check on DB
                                      console.log("attendance record inserted");
                                      res.send(recordset);
                                  }).catch(function(err) {
                                      res.send({ "error": "error" });
                                      console.log("Attendance " + err);
                                  });
                          }).catch(function(err) {
                              console.log(err);
                              res.send({ "error": "error" });
                          });
                    } else {
                      console.log("No absent students");
                      res.send({status: "No absent students"});
                    }
                }
            });
        }
        catch (e) {
            console.log(e);
            res.send({ "error": "error in your request" });
        }
    }

    populatePRF(req: express.Request, res: express.Response): void {
        console.log("Populating PRF...");
        new AuthController().authUser(req, res, {
            requiredAuth: auth, done: function() {
                var _id: string = req.params._id;
                sql.connect(config)
                    .then(function(connection) {
                        new sql.Request(connection)
                            .query("SELECT * FROM Clients C INNER JOIN SuitabilityForm S ON C.userID = S.userID WHERE C.userID = '" + _id + "' AND S.userID = '" + _id + "'")
                            .then(function(recordset) {
                                new PRFService().populatePRF(recordset[0]);
                                res.send({ "success": "success" });
                            }).catch(function(err) {
                                console.log("Get client by id for prf " + err);
                                res.send({ "error": "error" });
                            });
                    }).catch(function(err) {
                        console.log(err);
                        res.send({ "error": "error" });
                    });
            }
        });
    }
}
export = StudentController;
