const Employee = require("../models/model");

exports.createEmploye = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json(employee);
};

exports.getAllEmploye = async (req, res) => {
  const employee = await Employee.findAll();
  res.json(employee);
};

exports.getEmployeByID = async (req, res) => {
  console.log('req.params.id',req);
  
  const employee = await Employee.findByPk(req.params.id);
  res.json(employee);
};

exports.updateEmployeByID = async (req, res) => {
  await Employee.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({ message: "Employee updated Successfully" });
};

exports.deleteEmployeByID = async (req, res) => {
  await Employee.destroy({
    where: { id: req.params.id },
  });
  res.json({ message: "Employee Deletd Successfully" });
};
