USE company_infodb;

INSERT INTO department (id, name)
VALUES (1, 'Admin'), (2,'HR'), (3, 'Software Development'), (4, 'Finanace'), (5, 'Marketing');

INSERT INTO role(id, title, salary, department_id)
VALUES (1, 'Manager', 150000, 3), (2, 'Lead Engineer', 120000, 3), (3, 'Junior Developer', 70000, 3),(4, 'Administrative Assistant', 50000, 1), (5, 'Human Resources', 60000, 2), (6, 'Accountant', 80000, 4), (7, 'Marketing Head', 70000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Bob", "Ross", 3), ("Jackie", "Chan", 1), ("Johnny", "Knoxvile", 2), ("Brad", "Pitt", 4), ("Rick", "James", 5), ("Gerard", "Way", 6), ("Jim", "Carrey", 7);
