const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "exams",
  {
    examid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    examname: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
