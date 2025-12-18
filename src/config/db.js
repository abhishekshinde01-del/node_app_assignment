const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dataB123.sqlite", // database file will be created automatically
    logging: false,

});

module.exports = sequelize;

// 1 -   storage: "./database.sqlite", // database file will be created automatically


