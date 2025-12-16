const express = require('express')
const route = express.Router();
const controller = require('../controllers/controller')

route.post('/', controller.createEmploye)
route.get('/', controller.getAllEmploye)
route.get('/:id', controller.getEmployeByID)
route.put('/:id', controller.updateEmployeByID)
route.delete('/:id', controller.deleteEmployeByID)

module.exports = route