const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "employees",
    indexes: [{ fields: ["username"] }],
    timestamps: true,
  }
);

const Profile = sequelize.define("Profile", {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
},
 {
    tableName: "profiles",
    timestamps: true,
  }
);

const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


Employee.hasOne(Profile, { foreignKey: "employeeId", onDelete: "CASCADE" });
Profile.belongsTo(Employee, { foreignKey: "employeeId" });

Employee.belongsToMany(Project, { through: "EmployeeProjects" });
Project.belongsToMany(Employee, { through: "EmployeeProjects" });

module.exports = { Employee, Profile, Project };
