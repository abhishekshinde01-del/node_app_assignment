const express = require("express");
const route = express.Router();
const controller = require("../controllers/controller");

/**
 * @swagger
 * tags:
 *   - name: Employees
 *     description: Employee management APIs
 *   - name: Profiles
 *     description: Employee profile APIs
 *   - name: Projects
 *     description: Project management APIs
 */

/**
 * @swagger
 * /employe/employeeSafely/{id}:
 *   get:
 *     summary: Get employee safely by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 */
route.get("/employeeSafely/:id", controller.getEmployeeSafely);

/**
 * @swagger
 * /employe/batchEmployees:
 *   post:
 *     summary: Create multiple employees
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             employees:
 *               - name: John Doe
 *                 email: john@example.com
 *                 username: johndoe
 *               - name: Jane Smith
 *                 email: jane@example.com
 *                 username: janesmith
 *     responses:
 *       201:
 *         description: Employees created successfully
 */
route.post("/batchEmployees", controller.createMultipleEmployees);

/**
 * @swagger
 * /employe/employeProfile:
 *   post:
 *     summary: Create employee with profile
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Rahul Patil
 *             email: rahul@test.com
 *             username: rahul123
 *             bio: Backend developer
 *     responses:
 *       201:
 *         description: Employee and profile created
 */
route.post("/employeProfile", controller.createEmployeProfile);

/**
 * @swagger
 * /employe/profile/{employeeId}:
 *   get:
 *     summary: Get profile by employee ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profile found
 *       400:
 *         description: Profile not found
 */
route.get("/profile/:employeeId", controller.getProfileByEmployeeId);

/**
 * @swagger
 * /employe/employeProfile:
 *   get:
 *     summary: Get employees with pagination
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *       - in: query
 *         name: limit
 *         example: 5
 *     responses:
 *       200:
 *         description: Paginated employee list
 */
route.get("/employeProfile", controller.getAllEmployeWithPagination);

/**
 * @swagger
 * /employe/project:
 *   post:
 *     summary: Create a project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: HR Management System
 *     responses:
 *       201:
 *         description: Project created
 */
route.post("/project", controller.createProject);

/**
 * @swagger
 * /employe/assignProject:
 *   post:
 *     summary: Assign project to employee
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             employeeId: 1
 *             projectId: 2
 *     responses:
 *       200:
 *         description: Project assigned successfully
 *       404:
 *         description: Employee or project not found
 */
route.post("/assignProject", controller.assignProjectToEmployee);

/**
 * @swagger
 * /employe/employeeProjects/{id}:
 *   get:
 *     summary: Get employee with projects
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Employee with projects
 *       404:
 *         description: Employee not found
 */
route.get("/employeeProjects/:id", controller.getEmployeeWithProjects);

/**
 * @swagger
 * /employe:
 *   post:
 *     summary: Create a single employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Aman Verma
 *             email: aman@test.com
 *             username: amanv
 *     responses:
 *       201:
 *         description: Employee created
 */
route.post("/", controller.createEmploye);

/**
 * @swagger
 * /employe:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 */
route.get("/", controller.getAllEmploye);

/**
 * @swagger
 * /employe/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 */
route.get("/:id", controller.getEmployeByID);

/**
 * @swagger
 * /employe/{id}:
 *   put:
 *     summary: Update employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: Updated Name
 *             username: updated_username
 *     responses:
 *       200:
 *         description: Employee updated
 *       404:
 *         description: Employee not found
 */
route.put("/:id", controller.updateEmployeByID);

/**
 * @swagger
 * /employe/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
 */
route.delete("/:id", controller.deleteEmployeByID);

module.exports = route;
