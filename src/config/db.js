// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./dataB123.sqlite", // database file will be created automatically
//     logging: false,

// });

// module.exports = sequelize;

// 1 -   storage: "./database.sqlite", // database file will be created automatically


const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,      // database name
  process.env.DB_USER,      // database username
  process.env.DB_PASSWORD,  // database password
  {
    host: process.env.DB_HOST,
    dialect: "mysql",       // use MySQL
    logging: false,
    dialectOptions: {
      // You can add options like ssl here if needed
    }
  }
);

module.exports = sequelize;
