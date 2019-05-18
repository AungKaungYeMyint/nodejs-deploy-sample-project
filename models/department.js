const BaseModel = require('./baseModel');

class Department extends BaseModel {
    constructor() {
        super();
    }

    async getAll() {
        const department_query = `select * from departments`

        return new Promise((resolve, reject) => {
            this.sql.query(department_query, (error, departments) => {
                if (error) reject(error);
                else resolve(departments);
            });
        })
    }
}

module.exports = Department;