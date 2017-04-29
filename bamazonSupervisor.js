var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");

var config = require('./config.js');
var connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) throw err;
});

inquirer.prompt([

    {
        type: "list",
        name: "supervisorOptions",
        message: "Supervisor: What would you like to do?",
        choices: ["View product sales by department", "Create new department"]
    }
]).then(function(answer) {
    if (answer.supervisorOptions === "View product sales by department") {
        viewDepartmentSales();
    } else if (answer.supervisorOptions === "Create new department") {
        createDepartment();
    }
})

function viewDepartmentSales() {
    connection.query("SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales, departments.total_sales AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name", function(err, inventory) {
        if (err) throw err;
        console.table(inventory);
        connection.end();
    })
}

// The total_profit should be calculated on the fly using the difference between over_head_costs and total_sales.

function createDepartment() {

    inquirer.prompt([

        {
            type: "input",
            name: "addDepartment",
            message: "What department would you like to add?",
        }, {
            type: "input",
            name: "addOverhead",
            message: "What are the overhead costs of this department?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }

    ]).then(function(answer) {
        connection.query("SELECT * FROM departments", function(err, inventory) {
            if (err) throw err;
            connection.query("INSERT INTO departments SET ?", [{
                department_name: answer.addDepartment,
                overhead_costs: answer.addOverhead
            }]);
            console.log("Excellent. Departments have been updated.");
            connection.end();
        })
    })
}

// The total_profit should be calculated on the fly using the difference between over_head_costs and total_sales. total_profit should not be stored in any database. You should use a custom alias.
