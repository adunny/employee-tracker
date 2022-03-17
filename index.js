const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees } = require('./db/queries');


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
    }

}


renderMenu();