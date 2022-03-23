const inquirer = require('inquirer');
// import query functions
const { 
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee
} = require('./db/queries');

const db = require('./db/connection');




// welcome screen
console.log(`
.-=-=-=-=-=-=-=-=--.
| Employee Manager |
'-=-=-=-=-=-=-=-=--'
`);

// main menu
async function renderMenu() {
    const data = await inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ]
            }
        ]);
    if (data.mainMenu === 'View all departments') {
        getDepartments();
        setTimeout(() => renderMenu(), 1000);
    } else if(data.mainMenu === 'View all roles') {
        getRoles();
        setTimeout(() => renderMenu(), 1000);
    } else if (data.mainMenu === 'View all employees') {
        getEmployees();
        setTimeout(() => renderMenu(), 1000);
    } else if (data.mainMenu === 'Add a department') {
        promptAddDepartment();
    } else if (data.mainMenu === 'Add a role') {
        queryDeparments();
    } else if (data.mainMenu === 'Add an employee') {
        queryRoles();
    }
};

async function promptAddDepartment() {
    const data = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter new department name:',
            validate: input => {
                if (input) {
                    return true;
                } else {
                    return 'You must provide a name for this department.';
                }
            }
        }
    ]);
    addDepartment(data);
    setTimeout(() => renderMenu(), 1000);
};

async function promptAddRole(departmentsArr) {
    const data = await inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter new role name:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of this role:',
            validate: input => {
                if( isNaN(input) || !input ) {
                    return 'Must be a numeric value!';
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'departmentList',
            message: 'Select the department this role will belong to:',
            choices: departmentsArr
        }
    ]);
    addRole(data);
    setTimeout(() => renderMenu(), 1000);
};


function queryDeparments() {
    db.query(`SELECT name FROM department`, (err, results) => {
        if (err) {
            console.log(err);
        }
        let arr = results.map(department => {
            return department.name;
        })
        promptAddRole(arr);
    });
}

function queryRoles() {
    db.query(`SELECT id, title FROM role`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        let roleList = rows.map(({ id, title }) => ({ name: title, value: id }))
        queryManagers(roleList);
    });
}

function queryManagers(roleList) {
    const sql = `SELECT CONCAT(e.first_name, ' ',  e.last_name) AS name,
    id
    FROM employee e`

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        let managerList = rows.map(({ name, id}) => ({name, value: id}))
        promptAddEmployee(roleList, managerList);
    })
}

async function promptAddEmployee(roleList, managerList) {
    
    const data = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Enter the employee's first name:"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter the employees's last name:"
            },
            {
                type: 'list',
                name: "selectRole",
                message: "Select this employee's role:",
                choices: roleList
            },
            {
                type: 'list',
                name: 'selectManager',
                message: "Select this employee's manager:",
                choices: managerList
            }
        ]);
    addEmployee(data);
    setTimeout(() => renderMenu(), 1000);
}

renderMenu();

