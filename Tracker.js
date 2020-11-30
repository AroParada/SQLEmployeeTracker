var mysql = require("mysql");
var inquirer = require("inquirer");
const tb = require('terminal-banner').terminalBanner
const consoleTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "company_infodb"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected!")
  runSearch();
});

tb('Employee Manager')

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View ALL Employees",
        // "View ALL Employees By Department",
        // "View ALL Employees By Manager",
        "Add Employee",
        // "Remove Employee",
        "Update Employee Role",
        // "Update Employee Manager",
        "View All Roles",
        "Add Role",
        // "Remove Role",
        "View All Departments",
        "Add Department",
        // "Remove Department",
        "Quit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View ALL Employees":
        employeesSearch();
        break;
      
      case "Add Employee":
        addEmployee();
        break;
        
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      
      case "View All Roles":
        roleSearch();
        break;
      
      case "Add Role":
        addRole();
        break;  

      case "View All Departments":
        departmentsSearch();
        break; 
       
      case "Add Department":
        addDepartment();
        break;
    
      case "Quit":
        console.log("Goodbye :)");
        connection.end();
        break;
      }
    });

};

const employeesSearch = () => {
        var query =
        "SELECT employee.employeeid, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role on employee.role_id=role.id";
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table("\n", res);
          runSearch();
        });
      };
  
const roleSearch = () => {
        var query =
        "SELECT role.title, role.salary FROM employee LEFT JOIN role on employee.role_id=role.id";
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table("\n", res);
          runSearch();
        });
      };

const departmentsSearch = () => {
        var query =
        "SELECT * FROM department";
        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table("\n", res);
          runSearch();
        });
      };     