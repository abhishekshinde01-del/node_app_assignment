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
// const sequelize = new Sequelize(
//   process.env.DB_NAME, // database name
//   process.env.DB_USER, // database username
//   process.env.DB_PASSWORD, // database password
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql", // use MySQL
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // Necessary to bypass CA file requirements
//       },
//     },
//   }
// );

// const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.PORT, // This must be 23574
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This allows connection without a CA certificate file
      }
    },
    // Adding a timeout setting can also help debug
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
