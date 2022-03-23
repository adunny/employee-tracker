const db = require('./connection');
const { printTable } = require('console-table-printer');



function getDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        }
        printTable(results);
    });
};

function getRoles() {
    const sql = `SELECT role.id,
    role.title,
    role.salary,
    department.name AS department
    FROM role
    JOIN department ON department.id = role.department_id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        printTable(results);
    })
};

function getEmployees() {
    const sql = `SELECT e.id,
    e.first_name,
    e.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role ON e.role_id = role.id
    JOIN department ON department.id = role.department_id
    LEFT JOIN employee m ON e.id = m.manager_id
    ORDER BY e.id;`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        printTable(results);
    })
};

function addDepartment(data) {
    const sql = `INSERT INTO department(name) VALUES(?)`;
    const params = [data.department];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('Added department!');
    });
};

function addRole(data) {
    // query to get department id
    const sql = `SELECT id FROM department WHERE name = ?`
    const params = [data.departmentList];
    db.query(sql, params, (err, departmentId) => {
        if (err) {
            console.log(err);
        }
        // query again with department id
        const sql = `INSERT INTO role(title, salary, department_id)
        VALUES(?,?,?)`;
        const params = [data.roleName, data.salary, departmentId[0].id];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log('Role added!')
        });
    });
};



module.exports = { getDepartments, getRoles, getEmployees, addDepartment, addRole};