const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "marksheet",
  {
    srno: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentid: {
      type: Sequelize.INTEGER
    },
    academicyear: {
      type: Sequelize.STRING
    },
    examid: {
      type: Sequelize.INTEGER
    },
    subjectid: {
      type: Sequelize.INTEGER
    },
    chapter1: {
      type: Sequelize.INTEGER
    },
    chapter2: {
      type: Sequelize.INTEGER
    },
    chapter3: {
      type: Sequelize.INTEGER
    },
    chapter4: {
      type: Sequelize.INTEGER
    },
    chapter5: {
      type: Sequelize.INTEGER
    },
    chapter6: {
      type: Sequelize.INTEGER
    },
    chapter7: {
      type: Sequelize.INTEGER
    },
    chapter8: {
      type: Sequelize.INTEGER
    },
    chapter9: {
      type: Sequelize.INTEGER
    },
    chapter10: {
      type: Sequelize.INTEGER
    },
    Remarks: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
