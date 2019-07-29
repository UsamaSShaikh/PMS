const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "standards",
    {
        standardid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        year: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);
