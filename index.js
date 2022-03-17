const inquirer = require('inquirer');
const cTable = require('console.table');
const art = require('ascii-art');
const getDepartments = require('./db/queries');
const render = require('../../weekly-challenge-10/team-profile-generator/Develop/lib/htmlRenderer');

function renderMenu() {
    console.log(`
    .-=-=-=-=-=-=-=-=--.
    | Employee Manager |
    '-=-=-=-=-=-=-=-=--'
    `);
    return inquirer
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
        ])
        .then(data => {
            if (data.mainMenu === 'View all departments') {
                getDepartments();
            }
        });
}


renderMenu();