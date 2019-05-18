const sql = require('../utilities/mysql')

const getFruitById = async (id) => {
    return promise = await new Promise((resolve, reject) => {
        sql.query("Select * from fruits where id = ?", id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data[0]);
            }
        });
    })
};

const deleteById = async (id) => {
    return promise = await new Promise((resolve, reject) => {
        sql.query("Delete from fruits where id = ?", id, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
};

const updateById = async (id, fruit) => {
    return new Promise((resolve, reject) => {
        sql.query(
            "Update fruits set ? where id =?"
            , [fruit, id]
            , (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
    })
};

module.exports = {
    getFruitById,
    deleteById,
    updateById
}