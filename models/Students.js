const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "studentsdetails",
  {
    studentid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    dob: {
      type: Sequelize.DATE
    },
    qualification: {
      type: Sequelize.STRING
    },
    board: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.STRING
    },
    fathersname: {
      type: Sequelize.STRING
    },
    mothersname: {
      type: Sequelize.STRING
    },
    occupation: {
      type: Sequelize.STRING
    },
    income: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);