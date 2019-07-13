const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../database/db");
const Sequelize = require("sequelize");

const Student = require("../models/User");
const Academics = require("../models/Academics");
const MarkSheet = require("../models/MarkSheet");
const Exams = require("../models/Exams");

users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const Op = Sequelize.Op;
  const userData = {
    studentid: req.body.student_id,
    password: req.body.password
  };

  Student.findOne({
    where: {
      studentid: req.body.student_id
    }
  })
    .then(user => {
      // Check if record exists in db
      if (user) {
        ////console.log("Student Exists");
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          user
            .update({
              password: userData.password
            })
            .then(function() {
              res.json({ status: user.studentid + " registered" });
            });
        });
      } else {
        //console.log("Student does not exists 1");
        res.status(400).send({
          status: 400,
          message: "Student does not exists",
          type: "internal"
        });
      }
    })
    .catch(err => {
      //console.log("Student does not exists 2");
      res.status(400).send({
        status: 400,
        message: "Student does not exists",
        type: "internal"
      });
    });
});

users.post("/login", (req, res) => {
  //console.log(req.body);
  const userData = {
    student_id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: req.body.password
  };
  Student.findOne({
    where: {
      studentid: req.body.student_id
    }
  })
    .then(user => {
      if (user) {
        userData.student_id = user.studentid;
        userData.firstName = user.firstName;
        userData.lastName = user.lastName;
        userData.email = user.email;

        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(userData, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          //console.log("Invalid Password");
          //res.status(400).json({ error: "Invalid Password" });
          //res.status(400);
          //res.send("Invalid Password");
          res.status(400).send({
            status: 400,
            message: "Invalid Password",
            type: "internal"
          });
        }
      } else {
        //console.log("Student does not exist");
        //res.status(400).json({ error: "Student does not exist" });
        res.status(400).send({
          status: 400,
          message: "Student does not exist",
          type: "internal"
        });
      }
    })
    .catch(err => {
      //console.log("Us is here 3");
      res.status(400).json({ error: err });
    });
});

users.post("/studentAcademics", (req, res) => {
  const userData = {};
  //console.log("Route : " + req.body);
  Academics.findAll(
    {
      attributes: ["academicyear"]
    },
    {
      where: {
        studentid: req.body.student_id
      }
    },
    { raw: true, hierarchy: true, mapToModel: false }
  )
    .then(user => {
      if (user) {
        //console.log("Academics In Progress");
        res.send(user);
      } else {
        res.status(400).send({
          status: 400,
          message: "Invalid Academics",
          type: "internal"
        });
      }
    })
    .catch(err => {
      //console.log("Us is here 4");
      res.status(400).json({ error: err });
    });
});

users.post("/studentMarks", (req, res) => {
  const userData = {},
    academicYear = req.body.academics,
    student_id = req.body.student_id;
  console.log("Route Marks : ");
  console.log(req.body.academics);
  db.sequelize
    .query(
      'SELECT S.firstName,S.studentid,E.examname, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        101 +
        '" THEN M.chapter10 END)/10),2) AS History, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        102 +
        '" THEN M.chapter10 END)/10),2) AS Geography, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        103 +
        '" THEN M.chapter10 END)/10),2) AS Politics, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        104 +
        '" THEN M.chapter10 END)/10),2) AS Economics, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        105 +
        '" THEN M.chapter10 END)/10),2) AS Current, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        106 +
        '" THEN M.chapter10 END)/10),2) AS Technology, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        107 +
        '" THEN M.chapter10 END)/10),2) AS Ethics, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        108 +
        '" THEN M.chapter10 END)/10),2) AS CSAT, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        109 +
        '" THEN M.chapter10 END)/10),2) AS English, TRUNCATE((SUM(CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter1 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter2 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter3 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter4 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter5 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter6 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter7 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter8 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter9 END + CASE WHEN subjectid = "' +
        110 +
        '" THEN M.chapter10 END)/10),2) AS ModLang FROM marksheet M INNER JOIN studentsdetails S ON M.studentid = S.studentid INNER JOIN exams E ON M.examid = E.examid WHERE M.academicyear = "' +
        academicYear +
        '"AND S.studentid = "' +
        student_id +
        '"GROUP BY S.firstName,S.studentid,E.examname',
      {
        raw: true,
        hierarchy: true,
        model: MarkSheet,
        mapToModel: true
        // pass true here if you have any mapped fields
      }
    )
    .then(record => {
      // Each record will now be an instance of MarkSheet
      //console.log("In Sequelize query");
      //console.log(record);
      res.send(record);
    });
});

module.exports = users;