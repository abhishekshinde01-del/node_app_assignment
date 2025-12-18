const Employee = require("../models/model");

exports.getUserNames = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const {count, rows } = Employee.findAndCountAll({
    limit,
    offset,
    order: [["id", "ASC"]],
  });

  res.json({
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    users: rows,
  });
};
