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
function getDepartmentId(data) {
    const sql = `SELECT id FROM department WHERE name = ?`
    const params = [data.departmentList];
    db.query(sql, params, (err, departmentId) => {
        if (err) {
            console.log(err);
        }
        addRole(departmentId, data);
    })

}
function addRole(departmentId, data) {
    const sql = `INSERT INTO role(title, salary, department_id)
    VALUES(?,?,?)`;
    const params = [data.roleName, data.salary, departmentId[0].id];

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
        }
        
        console.log('Role added')
    })
    

}


module.exports = { getDepartments, getRoles, getEmployees, addDepartment, getDepartmentId};