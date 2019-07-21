const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "subjects",
  {
    subjectid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subjectname: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
