const inquirer = require('inquirer');
const { 
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    getDepartmentId
} = require('./db/queries');

let departmentsArr = ['Engineering', 'Finance', 'Legal', 'Sales'];

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
        promptAddDepartment(departmentsArr);
    } else if (data.mainMenu === 'Add a role') {
        promptAddRole(departmentsArr);
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
    console.log(departmentsArr);
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
    getDepartmentId(data);
    setTimeout(() => renderMenu(departmentsArr), 1000);
}

renderMenu();