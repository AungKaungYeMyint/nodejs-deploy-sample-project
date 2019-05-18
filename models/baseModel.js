const sql = require('../utilities/mysql');

class BaseModel {
    constructor() {
        this.sql = sql;
    }
}

module.exports = BaseModel;