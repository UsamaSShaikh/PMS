const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "syllabus",
    {
        srno: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        academicyear: {
            type: Sequelize.STRING
        },
        standard: {
            type: Sequelize.INTEGER
        },
        subjectid: {
            type: Sequelize.INTEGER
        },
        chapter1: {
            type: Sequelize.STRING
        },
        chapter2: {
            type: Sequelize.STRING
        },
        chapter3: {
            type: Sequelize.STRING
        },
        chapter4: {
            type: Sequelize.STRING
        },
        chapter5: {
            type: Sequelize.STRING
        },
        chapter6: {
            type: Sequelize.STRING
        },
        chapter7: {
            type: Sequelize.STRING
        },
        chapter8: {
            type: Sequelize.STRING
        },
        chapter9: {
            type: Sequelize.STRING
        },
        chapter10: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);
