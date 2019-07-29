const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "academics",
  {
    srno: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    academicyear: {
      type: Sequelize.STRING
    },
    studentid: {
      type: Sequelize.INTEGER
    },
    standard: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);
