const { Employee, Profile, Project } = require("../models/model");
const sequelize = require("../config/db"); // 👈 REQUIRED

exports.createEmploye = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

exports.getAllEmploye = async (req, res) => {
  const employee = await Employee.findAll();
  res.json(employee);
};

exports.getEmployeByID = async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  res.json(employee);
};

exports.updateEmployeByID = async (req, res) => {
  const [updatedRows] = await Employee.update(req.body, {
    where: { id: req.params.id },
  });

  if (updatedRows === 0) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee updated Successfully" });
};

exports.deleteEmployeByID = async (req, res) => {
  const deletedRows = await Employee.destroy({
    where: { id: req.params.id },
  });

  if (deletedRows === 0) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee Deleted Successfully" });
};

// Employee
exports.createEmployeProfile = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const employee = await Employee.create(
      {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
      },
      { transaction }
    );

    const profile = await Profile.create(
      {
        bio: req.body.bio,
        employeeId: employee.id,
      },
      { transaction }
    );
    await transaction.commit();
    res.status(201).json({ employee, profile });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};

/* ========== profile employe ID ========== */
exports.getProfileByEmployeeId = async (req, res) => {
  const profile = await Profile.findOne({
    where: { employeeId: req.params.employeeId },
  });
  if (!profile) {
    return res.status(400).json({ message: "Profile not found" });
  }
  res.json(profile);
};

/* ========== for paginationa part ========== */

exports.getAllEmployeWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { count, rows } = await Employee.findAndCountAll({
      attributes: ["id", "name", "email", "username"],
      include: {
        model: Profile,
        attributes: ["bio"],
      },
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    res.json({
      totalEmployees: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// for projects

exports.createProject = async (req, res) => {
  const project = await Project.create({
    title: req.body.title,
  });
  res.status(201).json(project);
};

exports.assignProjectToEmployee = async (req, res) => {
  const { employeeId, projectId } = req.body;

  const employee = await Employee.findByPk(employeeId);
  const project = await Project.findByPk(projectId);

  if (!employee || !project) {
    return res.status(404).json({ message: "Employee or Project not found" });
  }

  await employee.addProject(project);
  res.json({ message: "Project assigned to employee" });
};


// Handle error Pars here
exports.getEmployeeWithProjects = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: Project,
    });    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// created bulkEmploye api and used promise here

exports.createMultipleEmployees = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const employees = await Promise.all(
      req.body.employees.map(emp =>
        Employee.create(emp, { transaction: t })
      )
    );
    await t.commit();
    res.status(201).json(employees);
  } catch (err) {
    await t.rollback();
    res.status(400).json({ error: err.message });
  }
};

exports.getEmployeeSafely = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
