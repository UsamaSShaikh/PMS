const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../database/db");
const Sequelize = require("sequelize");

const Student = require("../models/Students");
const Admin = require("../models/Admin");
const Academics = require("../models/Academics");
const Subjects = require("../models/Subjects");
const Standards = require("../models/Standards");
const Syllabus = require("../models/Syllabus");
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
            .then(function () {
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

users.post("/loginUser", (req, res) => {
  console.log(req.body);
  const userData = {
    student_id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: req.body.student_password
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
        userData.dob = user.dob;
        userData.qualification = user.qualification;
        userData.contact = user.contact;
        userData.fatherName = user.fatherName;
        userData.motherName = user.motherName;
        console.log("Valid Password");
        if (bcrypt.compareSync(req.body.student_password, user.password)) {
          let token = jwt.sign(userData, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          console.log("Invalid Password");
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
        console.log("Student does not exist");
        //res.status(400).json({ error: "Student does not exist" });
        res.status(400).send({
          status: 400,
          message: "Student does not exist",
          type: "internal"
        });
      }
    })
    .catch(err => {
      console.log("Us is here 3");
      res.status(400).json({ error: err });
    });
});

users.post("/loginAdmin", (req, res) => {
  console.log(req.body);
  const adminData = {
    admin_id: "",
    firstName: "",
    lastName: "",
    password: req.body.admin_password
  };
  Admin.findOne({
    where: {
      id: req.body.admin_id
    }
  })
    .then(user => {
      if (user) {
        adminData.id = user.id;
        adminData.first_Name = user.first_Name;
        adminData.last_Name = user.last_Name;
        adminData.email = user.email;
        adminData.contact = user.contact;

        //if (bcrypt.compareSync(req.body.admin_password, user.password)) {
        if (
          req.body.admin_password.toUpperCase() === user.password.toUpperCase()
        ) {
          console.log("Admin Password Valid!");
          let token = jwt.sign(adminData, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          console.log("Invalid Admin Password");
          res.status(400).send({
            status: 400,
            message: "Invalid Admin Password",
            type: "internal"
          });
        }
      } else {
        console.log("Admin does not exist");
        res.status(400).send({
          status: 400,
          message: "Admin does not exist",
          type: "internal"
        });
      }
    })
    .catch(err => {
      console.log("Us is here 3");
      res.status(400).json({ error: err });
    });
});

users.post("/addStudent", (req, res) => {
  console.log("Route AddStudent")
  console.log(req.body);

  Student.create({
    studentid: req.body.studentid,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    qualification: req.body.qualification,
    board: req.body.board,
    email: req.body.email,
    contact: req.body.contact,
    fathersname: req.body.fathersname,
    mothersname: req.body.mothersname,
    occupation: req.body.occupation,
    income: req.body.income,
    password: req.body.password
  })
    .then(user => {
      if (user) {
        console.log("Student Added Successfully!");
        res.send(user);
        //res.json(data.get({plain: true}));
      }
      else {
        console.log("Error in insert new record");
        res.status(400).send({
          status: 400,
          message: "Error in insert new record",
          type: "internal"
        });
      }
    }).catch(err => {
      console.log("Us is here 3");
      res.status(400).json({ error: err });
    });
})

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

users.post("/studentsDetails", (req, res) => {
  console.log("studentsDetails");
  Student.findAll()
    .then(student => {
      // Check if record exists in db
      if (student) {
        console.log("Students Details Exists");
        res.send(student);
      } else {
        res.status(400).send({
          status: 400,
          message: "Students Details does not exists 1",
          type: "internal"
        });
      }
    })
    .catch(err => {
      console.log("Us is here Subjects");
      res.status(400).json({ error: err });
    });
});

users.post("/studentExams", (req, res) => {
  console.log("studentExams");
  Exams.findAll()
    .then(exam => {
      // Check if record exists in db
      if (exam) {
        console.log("Exams Exists");
        res.send(exam);
      } else {
        res.status(400).send({
          status: 400,
          message: "Exams does not exists 1",
          type: "internal"
        });
      }
    })
    .catch(err => {
      console.log("Us is here Exams");
      res.status(400).json({ error: err });
    });
});

users.post("/studentSubjects", (req, res) => {
  console.log("studentSubjects");
  Subjects.findAll()
    .then(subject => {
      // Check if record exists in db
      if (subject) {
        console.log("Subjects Exists");
        res.send(subject);
      } else {
        res.status(400).send({
          status: 400,
          message: "Subjects does not exists 1",
          type: "internal"
        });
      }
    })
    .catch(err => {
      console.log("Us is here Subjects");
      res.status(400).json({ error: err });
    });
});

users.post("/studentStandard", (req, res) => {
  console.log("studentStandard");
  Standards.findAll()
    .then(standard => {
      // Check if record exists in db
      console.log("Standard Exists")
      if (standard) {
        console.log("Standard Found!");
        res.send(standard);
      } else {
        res.status(400).send({
          status: 400,
          message: "Standard does not exists 1",
          type: "internal"
        });
      }
    })
    .catch(err => {
      console.log("Us is here Standard");
      res.status(400).json({ error: err });
    });
});


users.post("/studentSyllabus", (req, res) => {
  const userData = {};
  console.log("Route Student Syllabus: ")
  console.log(req.body);
  Syllabus.findAll({
    where: {
      academicyear: req.body.academicyear,
      standard: req.body.standardid,
      subjectid: req.body.subjectid
    }
  },
    { raw: true, hierarchy: true, mapToModel: false }
  )
    .then(user => {
      console.log("Academics Exists")
      if (user) {
        res.send(user);
      } else {
        res.status(400).send({
          status: 400,
          message: "Invalid Syllabus",
          type: "internal"
        });
      }
    })
    .catch(err => {
      console.log("Us is here 4");
      res.status(400).json({ error: err });
    });
});

users.post("/studentMarks", (req, res) => {
  const academicYear = req.body.academics,
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

users.post("/subjectMarks", (req, res) => {
  console.log("Route subjectMarks");
  const student_id = req.body.student_id,
    academicYear = req.body.academicYear,
    subjectid = req.body.subjectid;
  console.log(req.body.academicYear + " " + req.body.subjectid);
  db.sequelize
    .query(
      'SELECT S.firstName,S.studentid,E.examname, M.chapter1,M.chapter2,M.chapter3,M.chapter4,M.chapter5,M.chapter6,M.chapter7,M.chapter8,M.chapter9,M.chapter10 FROM marksheet M INNER JOIN studentsdetails S ON M.studentid = S.studentid INNER JOIN exams E ON M.examid = E.examid WHERE M.academicyear = "' +
      academicYear +
      '" AND M.subjectid = "' +
      subjectid +
      '" AND s.studentid = "' +
      student_id +
      '"',
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

users.post("/addStudentMarks", (req, res) => {
  console.log("Route Add Student Marks")
  console.log(req.body);

  MarkSheet.create({
    studentid: req.body.studentid,
    academicyear: req.body.academicyear,
    examid: req.body.examid,
    subjectid: req.body.subjectid,
    chapter1: req.body.chapter1,
    chapter2: req.body.chapter2,
    chapter3: req.body.chapter3,
    chapter4: req.body.chapter4,
    chapter5: req.body.chapter5,
    chapter6: req.body.chapter6,
    chapter7: req.body.chapter7,
    chapter8: req.body.chapter8,
    chapter9: req.body.chapter9,
    chapter10: req.body.chapter10,
    Remarks: req.body.Remarks
  })
    .then(user => {
      if (user) {
        console.log("Student Marks Added Successfully!");
        res.send(user);
        //res.json(data.get({plain: true}));
      }
      else {
        console.log("Error in insert Marks");
        res.status(400).send({
          status: 400,
          message: "Error in insert Student Marks",
          type: "internal"
        });
      }
    }).catch(err => {
      console.log("Us is here 3");
      res.status(400).json({ error: err });
    });
})

module.exports = users;
