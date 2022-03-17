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
    JOIN department ON department.id = role.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        printTable(results);
    })
};

function getEmployees() {
    const sql = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary AS salary
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON department.id = role.department_id
    ORDER BY employee.id`;
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        printTable(results);
    })
};


module.exports = { getDepartments, getRoles, getEmployees };