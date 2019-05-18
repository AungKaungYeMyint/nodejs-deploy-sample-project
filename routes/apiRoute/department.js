const express = require('express');

const route = express.Router();

const DepartmentController = require('../../controllers/department');
const controller = new DepartmentController();
const jwt = require('jsonwebtoken');
const key = require('../../utilities/key');

route.use(require('../../middlewares/auth'));

route.get('/', (req, res) => {
    controller.getAll(req, res);
});

route.post('/', (req, res) => {
    res.send("Create a department");
});

route.put('/:id', (req, res) => {
    res.send("Update department");
});

route.delete('/:id', (req, res) => {
    res.send("Delete department");
});

module.exports = route;

