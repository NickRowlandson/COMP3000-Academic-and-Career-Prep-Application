import express = require("express");
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import AuthController = require("../controllers/AuthController");
const MailService = require("../services/MailService");
const PRFService = require("../services/PRFService");
var sql = require('mssql');
//var auth = ["Admin", "Staff"];

class ClientFormsController {
  consentForm(req: express.Request, res: express.Response): void
  {
    try {
      // new AuthController().authUser(req, res, {
      //   requiredAuth: auth, done: function() {
          var consentForm = req.body.consentForm;
          var _id: string = req.params._id;
          sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              var consentQuery = "'" + _id + "', '" +
                   consentForm.firstName + "', '" +
                   consentForm.lastName + "', '" +
                   consentForm.date + "', '" +
                   consentForm.phone + "', '" +
                   consentForm.detailedMessageYes + "', '" +
                   consentForm.detailedMessageNo + "', '" +
                   consentForm.ontarioWorks + "', '" +
                   consentForm.ontarioDisabilityProgram + "', '" +
                   consentForm.employmentInsurance + "', '" +
                   consentForm.employmentServices + "', '" +
                   consentForm.other + "', '" +
                   consentForm.contactName + "', '" +
                   consentForm.contactNum + "', '" +
                   consentForm.literacyAgencies + "', '" +
                   consentForm.literacyWitness + "'";
            new sql.Request().query("INSERT INTO Consent VALUES ("+consentQuery+")").then(function() {
                res.send({ "success": "success" });
            }).catch(function(err) {
                console.log("Save consent form " + err);
                res.send({ "error": "error" });
            });
       });
      //   }
      // });
    }catch (e) {
        console.log(e);
        res.send({ "error": "error in your request" });
    }
  }

  learningStyleForm(req: express.Request, res: express.Response): void
  {
    try {
      // new AuthController().authUser(req, res, {
      //   requiredAuth: auth, done: function() {
          var learningStyleForm = req.body.learningStyleForm;
          var _id: string = req.params._id;
          sql.connect("mssql://NickRowlandson:georgianTest1@nr-comp2007.database.windows.net/GeorgianApp?encrypt=true").then(function() {
              var learningStyleQuery = "'" + _id + "', '" +
                   learningStyleForm.seeing + "', '" +
                   learningStyleForm.hearing + "', '" +
                   learningStyleForm.doing + "'";
            new sql.Request().query("INSERT INTO LearningStyle VALUES ("+learningStyleQuery+")").then(function() {
                res.send({ "success": "success" });
            }).catch(function(err) {
                console.log("Save learning style form " + err);
                res.send({ "error": "error" });
            });
       });
      //   }
      // });
    }catch (e) {
        console.log(e);
        res.send({ "error": "error in your request" });
    }
  }
}
export = ClientFormsController;
