const express = require('express')
const route = express.Router();
const controller = require("../controllers/controller");


// For Employee*/
route.post("/employeProfile", controller.createEmployeProfile);
route.get("/profile/:employeeId", controller.getProfileByEmployeeId);
route.get("/employeProfile", controller.getAllEmployeWithPagination);

// For project*/
route.post("/project", controller.createProject);
route.post("/assignProject", controller.assignProjectToEmployee);
route.get("/employeeProjects/:id", controller.getEmployeeWithProjects);

route.post("/", controller.createEmploye);
route.get("/", controller.getAllEmploye);
route.get("/:id", controller.getEmployeByID);
route.put("/:id", controller.updateEmployeByID);
route.delete("/:id", controller.deleteEmployeByID);





module.exports = route

