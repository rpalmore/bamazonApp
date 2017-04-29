var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");

var config = require('./config.js');
var connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) throw err;
});

connection.query("SELECT item_id, product_name, price FROM products", function(err, inventory) {
    if (err) throw err;
    console.table(inventory);
    getOrder();

    function getOrder() {
        inquirer.prompt([

            {
                type: "input",
                name: "item_id",
                message: "What is the ID of the product you would like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },

            {
                type: "input",
                name: "order_quantity",
                message: "How many units can we get you?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            var query = "SELECT stock_quantity, price, department_name, product_sales FROM products WHERE ?";
            connection.query(query, { item_id: answer.item_id }, function(err, inventory) {
                if (err) throw err;
                if (inventory[0].stock_quantity > answer.order_quantity) {
                    connection.query("UPDATE products SET ?, ? WHERE ?", [{
                        stock_quantity: (inventory[0].stock_quantity - answer.order_quantity)
                    }, {
                        product_sales: (inventory[0].product_sales + (inventory[0].price * answer.order_quantity))
                    }, {
                        item_id: answer.item_id
                    }], function(err) {
                        if (err) throw err;
                        var price = (answer.order_quantity * inventory[0].price);
                        console.log("Thank you for your order. Your total today is $" + price);
                        connection.query("SELECT * FROM departments", function(err, results) {
                            if (err) throw err;
                            connection.query("UPDATE departments SET ? WHERE ?", [{
                                total_sales: (inventory[0].product_sales + (inventory[0].price * answer.order_quantity))
                            }, {
                                department_name: inventory[0].department_name
                            }], function(err) {
                                if (err) throw err;
                                connection.end();
                            }) 
                        })
                    })

                } else {
                    console.log("I'm sorry, we don't have that quantity. Please try selecting a smaller number of units.")
                    connection.end();
                }
            });
        })
    }
})
