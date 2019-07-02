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
const Marks = require("../models/marks");

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
        // console.log("Student Exists");
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
        // console.log("Student does not exists 1");
        res.status(400).send({
          status: 400,
          message: "Student does not exists",
          type: "internal"
        });
      }
    })
    .catch(err => {
      // console.log("Student does not exists 2");
      res.status(400).send({
        status: 400,
        message: "Student does not exists",
        type: "internal"
      });
    });
});

users.post("/login", (req, res) => {
  // // console.log(req.body);
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
          res.status(400).send({
            status: 400,
            message: "Invalid Password",
            type: "internal"
          });
        }
      } else {
        res.status(400).send({
          status: 400,
          message: "Student does not exist",
          type: "internal"
        });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.post("/studentAcademics", (req, res) => {
  const userData = {};
  // ("Route : " + req.body);
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
      // // console.log("Us is here 4");
      res.status(400).json({ error: err });
    });
});

users.post("/studentMarks", (req, res) => {
  const userData = {};

  db.sequelize
    .query(
      'select s.firstName,s.studentid,e.examname,subject1.History,subject2.Geography,subject3.Politics,subject4.Economics,subject5.Current,subject6.Technology,subject7.Ethics,subject8.CSAT,subject9.English,subject10.ModLang from studentsdetails s,exams e, marksheet r,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as History from marksheet group by subjectID) subject1,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as Geography from marksheet group by subjectID) subject2,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as Politics from marksheet group by subjectID) subject3,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as Economics from marksheet group by subjectID) subject4,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as Current from marksheet group by subjectID) subject5,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as Technology from marksheet group by subjectID) subject6,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as Ethics from marksheet group by subjectID) subject7,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as CSAT from marksheet group by subjectID) subject8,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as English from marksheet group by subjectID) subject9,(select subjectID,(sum(chapter1)+(chapter2)+(chapter3)+(chapter4)+(chapter5)+(chapter6)+(chapter7)+(chapter8)+(chapter9)+(chapter10)) as ModLang from marksheet group by subjectID) subject10 where subject1.subjectID="' +
        101 +
        '" and subject2.subjectID="' +
        102 +
        '" and subject3.subjectID="' +
        103 +
        '" and subject4.subjectID="' +
        104 +
        '" and subject5.subjectID="' +
        105 +
        '" and subject6.subjectID="' +
        106 +
        '" and subject7.subjectID="' +
        107 +
        '" and subject8.subjectID="' +
        108 +
        '" and subject9.subjectID="' +
        109 +
        '" and subject10.subjectID="' +
        110 +
        '" and s.studentid="' +
        100001 +
        '" group by s.firstName,s.studentid,e.examname',
      {
        raw: true,
        hierarchy: true,
        model: MarkSheet,
        mapToModel: true
        // pass true here if you have any mapped fields
      }
    )
    .then(record => {
      res.send(record);
    });
});

users.post("/marks", (req, res) => {
  console.log(req.body);
  let user = req.body;
  db.sequelize
    .query(
      "SELECT marksheet.*, subjects.subjectname, exams.examname FROM marksheet, subjects, exams WHERE marksheet.studentid = " +
        user.student_id +
        " AND marksheet.subjectid = " +
        user.subject +
        " AND marksheet.academicyear = '" +
        user.year +
        "' AND subjects.subjectid = " +
        user.subject +
        " AND marksheet.examid = exams.examid",
      {
        raw: true,
        hierarchy: true,
        model: Marks,
        mapToModel: true
        // pass true here if you have any mapped fields
      }
    )
    .then(record => {
      // Each record will now be an instance of MarkSheet
      // console.log(record);
      res.send(record);
    });
});

users.post("/subject", (req, res) => {
  db.sequelize
    .query("SELECT * FROM `subjects`", {
      raw: true,
      hierarchy: true,
      model: Marks,
      mapToModel: true
      // pass true here if you have any mapped fields
    })
    .then(record => {
      // Each record will now be an instance of MarkSheet
      res.send(record);
    });
});

module.exports = users;
