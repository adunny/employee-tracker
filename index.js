const inquirer = require('inquirer');
// import query functions
const { 
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole
} = require('./db/queries');

const db = require('./db/connection');




// welcome screen
console.log(`
.-=-=-=-=-=-=-=-=--.
| Employee Manager |
'-=-=-=-=-=-=-=-=--'
`);

// main menu
async function renderMenu(departmentsArr) {
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
        getDepartments(departmentsArr);
        setTimeout(() => renderMenu(departmentsArr), 1000);
    } else if(data.mainMenu === 'View all roles') {
        getRoles(departmentsArr);
        setTimeout(() => renderMenu(departmentsArr), 1000);
    } else if (data.mainMenu === 'View all employees') {
        getEmployees(departmentsArr);
        setTimeout(() => renderMenu(departmentsArr), 1000);
    } else if (data.mainMenu === 'Add a department') {
        promptAddDepartment(departmentsArr);
    } else if (data.mainMenu === 'Add a role') {
        promptAddRole(departmentsArr);
    } else if (data.mainMenu === 'Add an employee') {
        promptAddEmployee();
    }
};

async function promptAddDepartment(departmentsArr) {
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
    departmentsArr.push(data.department);
    addDepartment(data);
    setTimeout(() => renderMenu(departmentsArr), 1000);
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
    setTimeout(() => renderMenu(departmentsArr), 1000);
};

// generate dynamic departments array
db.query(`SELECT name FROM department`, (err, results) => {
    if (err) {
        console.log(err);
    }
    let arr = results.map(department => {
        return department.name;
    })
    renderArray(arr);
});
function renderArray(arr) {
    let departmentsArr = arr;
    renderMenu(departmentsArr);
};

async function promptAddEmployee() {
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
        }
    ])
}
