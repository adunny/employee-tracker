const inquirer = require('inquirer');
const { 
    getDepartments,
    getRoles,
    getEmployees,
    AddDepartment 
} = require('./db/queries');


console.log(`
.-=-=-=-=-=-=-=-=--.
| Employee Manager |
'-=-=-=-=-=-=-=-=--'
`);

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
                    console.log('You must provide a name for this department.');
                    return false;
                }
            }
        }
    ]);
    AddDepartment(data);
    setTimeout(() => renderMenu(), 1000);
};

async function promptAddRole() {
    const data = await inquirer
    .prompt([
        {
            type: 'text',
            name: 'roleName',
            message: 'Enter new role name:'
        },
        {
            type: ''
        }
    ])
}

renderMenu();