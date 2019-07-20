const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  "admindetails",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_Name: {
      type: Sequelize.STRING
    },
    last_Name: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    contact: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
