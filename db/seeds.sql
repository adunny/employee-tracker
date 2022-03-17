INSERT INTO department(name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead', 100, 4),
('Salesperson', 30, 4),
('Lead Engineer', 150, 1),
('Software Engineer', 110, 1),
('Account Manager', 200, 2),
('Accountant', 150, 2),
('Legal Team Lead', 300, 3),
('Lawyer', 250, 3); 


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Alec', 'Hardy', 1, null),
('Ellie', 'Miller', 2, 1),
('Maggie', 'Radcliffe', 3, null),
('Olly', 'Stevens', 4, 3),
('Mark', 'Latimer', 5, null),
('Nige', 'Carter', 6, 5),
('Jocelyn', 'Knight', 7, null),
('Sharon', 'Bishop', 8, 7);