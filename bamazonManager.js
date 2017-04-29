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
        name: "managerOptions",
        message: "Manager: What would you like to do?",
        choices: ["View all products for sale", "View low-inventory items (fewer than 5)", "Increase inventory of a specific product", "Add new product to inventory"]
    }
]).then(function(answer) {
    if (answer.managerOptions === "View all products for sale") {
        viewAllProducts();
    } else if (answer.managerOptions === "View low-inventory items (fewer than 5)") {
        viewLowInventory();

    } else if (answer.managerOptions === "Increase inventory of a specific product") {
        addInventory();
    } else if (answer.managerOptions === "Add new product to inventory") {
        addNewProduct();
    }

    function viewAllProducts() {
        connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, inventory) {
            if (err) throw err;
            console.table(inventory);
            connection.end();
        })
    }

    function viewLowInventory() {
        connection.query("SELECT item_id, product_name, stock_quantity, item_id FROM products HAVING stock_quantity < 5 ORDER BY stock_quantity ASC", function(err, inventory) {
            if (err) throw err;
            console.table(inventory);
            connection.end();
        })
    }

    function addInventory() {
        connection.query("SELECT * FROM products", function(err, inventory) {
            if (err) throw err;

            inquirer.prompt([{
                type: "list",
                name: "addInventory",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < inventory.length; i++) {
                        choiceArray.push(inventory[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What item would you like to add inventory to?",
            }, {
                type: "input",
                name: "input_quantity",
                message: "How many units would you like to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }]).then(function(answer) {

                var query = "SELECT stock_quantity FROM products WHERE ?";
                connection.query(query, { product_name: answer.addInventory }, function(err, inventory) {
                    if (err) throw err;
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: (inventory[0].stock_quantity + parseInt(answer.input_quantity))
                    }, {
                        product_name: answer.addInventory
                    }], function(err, inventory) {
                        if (err) throw err;
                        console.log("Excellent. Inventory has been updated.");
                        connection.end();

                    })
                })
            })
        })
    }

    function addNewProduct() {

        inquirer.prompt([

            {
                type: "input",
                name: "addProduct",
                message: "What product would you like to add?",
            }, {
                type: "input",
                name: "addDepartment",
                message: "In what department is this new product going to be sold?",
            }, {
                type: "input",
                name: "addPrice",
                message: "What is the price of this product?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }, {
                type: "input",
                name: "addInventory",
                message: "How many units of this product are we adding to inventory?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function(answer) {
            connection.query("SELECT * FROM products", function(err, inventory) {
                if (err) throw err;
                connection.query("INSERT INTO products SET ?", [{
                    product_name: answer.addProduct,
                    department_name: answer.addDepartment,
                    price: answer.addPrice,
                    stock_quantity: answer.addInventory
                }]);

                connection.query("SELECT * FROM departments", function(err, inventory) {
                    if (err) throw err;
                    connection.query("INSERT INTO departments SET ?, ?", [{
                        department_name: answer.addDepartment
                    }, {
                        overhead_costs: 500
                    }]);
                    console.log("Excellent. Inventory has been updated.");
                    connection.end();
                })
            })
        })
    }
})
