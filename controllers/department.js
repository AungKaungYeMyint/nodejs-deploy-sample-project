const DepartmentModel = require('../models/department');
const EmployeeModel = require('../models/employee');

const model = new DepartmentModel();
const employeeModel = new EmployeeModel();


class DepartmentController {

    getAll(req, res) {

        model.getAll()
            .then(departments => {
                const ids = departments.map(d => d.id);
                employeeModel.getByMultipleIds(ids).then(employee => {
                    departments.forEach(d => {
                        d.employee = employee.filter(item => item.department_id == d.id);
                    });
                    res.status(200).send(departments);
                })
            })
            .catch(error => {
                throw error;
            });
    }

}


module.exports = DepartmentController