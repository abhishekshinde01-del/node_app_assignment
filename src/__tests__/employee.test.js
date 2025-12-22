process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const { Employee, Project } = require("../models/model");
const sequelize = require("../config/db");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("Employee API Tests", () => {
  test("Create Employee", async () => {
    const res = await request(app).post("/employe").send({
      name: "Johdn Doe",
      email: "johdn@test.com",
      username: "john123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Employee Created Successfuly");
  });

  test("Get All Employees", async () => {
    const res = await request(app).get("/employe");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Get Employee By ID", async () => {
    const employee = await Employee.create({
      name: "Jane",
      email: "jane@test.com",
      username: "jane123",
    });

    const res = await request(app).get(`/employe/${employee.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Jane");
  });

  test("Create Employee with Profile (Transaction)", async () => {
    const res = await request(app).post("/employe/employeProfile").send({
      name: "Profile User",
      email: "profile@test.com",
      username: "profile123",
      bio: "Software Engineer",
    });

    expect(res.statusCode).toBe(201);
     expect(res.body.message).toBe("Employee with profile created Successfully");
  });

  test("Create Employee with Profile (Transaction) with Error", async () => {
    const res = await request(app).post("/employe/employeProfile").send({
      name: "Profile User",
    });
    expect(res.statusCode).toBe(400);
  });

  test("Return 404 if Employee Not Found", async () => {
    const res = await request(app).get("/employeeSafely/999");
    expect(res.statusCode).toBe(404);
  });

  // For createMultipleEmployees
  test("Create multiple employees successfully", async () => {
    const res = await request(app)
      .post("/employe/batchEmployees")
      .send({
        employees: [
          {
            name: "Bulk One",
            email: "bulk1@test.com",
            username: "bulk1",
          },
          {
            name: "Bulk Two",
            email: "bulk2@test.com",
            username: "bulk2",
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Bulk Employee created Successfully");

    const count = await Employee.count();
    expect(count).toBe(5);
  });

  test("Create multiple employees successfully with error", async () => {
    const res = await request(app)
      .post("/employe/batchEmployees")
      .send({
        employees: [
          {
            name: "Bulk One",
            email: "bulk1@test.com",
            username: "bulk1",
          },
          {
            name: "Bulk Two",
            email: "bulk2@test.com",
            username: "bulk2",
          },
        ],
      });

    expect(res.statusCode).toBe(400);
  });

  // For getEmployeeSafely
  test("Get employee safely by ID", async () => {
    const res = await request(app).get(`/employe/employeeSafely/1`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe("Johdn Doe");
  });

  test("Return 404 if employee not found (safe)", async () => {
    const res = await request(app).get("/employe/employeeSafely/9999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });

  // for getAllEmployeWithPagination
  test("getAllEmployeWithPagination", async () => {
    const res = await request(app).get(`/employe/employeProfile`);
    expect(res.statusCode).toBe(200);
  });

  // for Create project
  test("Create project successfully", async () => {
    const res = await request(app)
      .post("/employe/project")
      .send({ title: "Node.js Project" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Node.js Project");
  });

  // for assign project
  test("Assign project to employee", async () => {
    const employee = await Employee.create({
      name: "Project User",
      email: "projectuser@test.com",
      username: "projectuser",
    });

    const project = await Project.create({
      title: "Sequelize Project",
    });

    const res = await request(app).post("/employe/assignProject").send({
      employeeId: employee.id,
      projectId: project.id,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Project assigned to employee");

    const employeeWithProjects = await Employee.findByPk(employee.id, {
      include: Project,
    });

    expect(employeeWithProjects.Projects.length).toBe(1);
    expect(employeeWithProjects.Projects[0].title).toBe("Sequelize Project");
  });

  //getProfileByEmployeeId
  test("Should return employee with projects with error", async () => {
    const employee = await Employee.create({
      name: "Project User",
      email: "project@test.com",
      username: "projectuser",
    });

    const project1 = await Project.create({ title: "API Project" });
    const project2 = await Project.create({ title: "DB Project" });

    await employee.addProjects([project1, project2]);

    const res = await request(app).get(`/employe/profile/6`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Profile not found");
  });

  //getEmployeeWithProjects
  test("Should return employee with projects", async () => {
    await sequelize.sync({ force: true });
    const employee = await Employee.create({
      name: "Project User",
      email: "project@test.com",
      username: "projectuser",
    });

    const project1 = await Project.create({ title: "API Project" });
    const project2 = await Project.create({ title: "DB Project" });

    await employee.addProjects([project1, project2]);

    const res = await request(app).get(`/employe/employeeProjects/1`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("Projects");
    expect(res.body.Projects.length).toBe(2);
    expect(res.body.Projects[0]).toHaveProperty("title");
  });

  // For update
  test("Update employee by ID", async () => {
    const res = await request(app).put(`/employe/1`).send({
      name: "Updated Name",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Employee updated Successfully");

    const updatedEmployee = await Employee.findByPk(1);
    expect(updatedEmployee.name).toBe("Updated Name");
  });

  test("Return 404 when updating non-existing employee", async () => {
    const res = await request(app)
      .put("/employe/9999")
      .send({ name: "No One" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });

  // For Delete
  test("Delete employee by ID", async () => {
    const res = await request(app).delete(`/employe/1`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Employee Deleted Successfully");

    const deletedEmployee = await Employee.findByPk(1);
    expect(deletedEmployee).toBeNull();
  });

  test("Return 404 when deleting non-existing employee", async () => {
    const res = await request(app).delete("/employe/9999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });
});
