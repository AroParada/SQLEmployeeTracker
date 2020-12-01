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
      
const addEmployee = () => {
  let roleTitles = [];
	var managersIDs = {};
	let managersList = [];
	let managers = [];
	var roleIds = {};

	var query =
		"SELECT role.id, role.title, employee.employeeid, employee.first_name, employee.last_name, employee.role_id FROM role LEFT JOIN employee ON role.id=employee.role_id;";
	connection.query(query, function (err, results) {
		if (err) throw err;
		inquirer
			.prompt([
				{
					type: "input",
					name: "firstname",
					message: "What is the first name of your employee?",
				},
				{
					type: "input",
					name: "lastname",
					message: "What is the last name of your employee?",
				},
				{
					type: "list",
					name: "roleid",
					message: "What is the role id of your employee?",
					choices: function () {
						for (let i = 0; i < results.length; i++) {
							var title = `${results[i].id} ${results[i].title}`;
							roleTitles.push(title);
							roleIds[title] = results[i].id;
						}
						return roleTitles;
					},
				},
				{
					type: "list",
					name: "managerid",
					message: "Who is the employees manager?",
					choices: function () {
						for (let i = 0; i < results.length; i++) {
							if (results[i].title == "Manager") {
								var name = `${results[i].first_name} ${results[i].last_name}`;
								managers.push(name);
								managersIDs[name] = results[i].employeeid;
							}
						}
						managersList = [...managers, "This Employee is a Manager"];
						return managersList;
					},
				},
			])
			.then((answer) => {
				if (answer.managerid === "This Employee is a Manager") {
					var query =
						"INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)";
					connection.query(
						query,
						[answer.firstname, answer.lastname, roleIds[answer.roleid]],
						function (err, res) {
							if (err) throw err;
							console.log(
								"\n",
								`You have added ${answer.firstname} ${answer.lastname}. What would you like to do next?`
							);
						}
					);
				} else {
					var query =
						"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
					connection.query(
						query,
						[
							answer.firstname,
							answer.lastname,
							roleIds[answer.roleid],
							managersIDs[answer.managerid],
						],
						function (err, res) {
							if (err) throw err;
							console.log(
								"\n",
								`You have added ${answer.firstname} ${answer.lastname}. What would you like to do next?`
							);
						}
					);
				}
				promptOptions();
			});
	});
};
        
                