const db = require('./connection');

const getDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
    })
}


module.exports = getDepartments;