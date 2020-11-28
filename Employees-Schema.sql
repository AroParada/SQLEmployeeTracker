DROP DATABASE IF EXISTS company_infoDB;
CREATE database company_infoDB;

USE company_infoDB;

CREATE TABLE department (
  id INT NOT NULL PRIMARY KEY,
--   hold department name
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT NOT NULL PRIMARY KEY,
--   hold role title
  title VARCHAR(30),
  salary DECIMAL(7,3),
  department_id INT
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
)

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;



