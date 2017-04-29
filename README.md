# bamazonApp
Welcome to my storefront. A brief rundown below explains how you can shop and manage the store's inventory, depending on your status as a customer, manager or supervisor.

We're storing data in MySQL for this project.

### Challenge #1: Customer View

1. Run the Node application called `bamazonCustomer.js` to display all of the items available for sale in our Bamazon storefront. You will see the ids, names and prices of the products for sale.

2. As a customer, you can the following:

   * Input the ID of the product you would like to buy.
   * Input the number of units of the product you would like to buy.

3. If the store has enough of the product to meet your order, you will be given the total purchase price. If there is a supply shortage, you will be prompted to enter a new amount.

4. Behind the scenes in the MySQL database, we are updating the stock of all products.

### Challenge #2: Manager View

* As a manager, you can run the Node application called `bamazonManager.js` to get additional details about the store:

    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
    	* Note: New departments created via this command will get a default overhead_costs setting of $500. When a supervisor creates a new department (see below), they can set a unique overhead_cost.

Use the arrow keys to make a selection and follow the prompts!

### Challenge #3: Supervisor View

As a supervisor, you have even more access to our storefront data, including a product_sales column in MySQL that will show you the total sales by department, and a new department table that will display overhead costs for each department. Create a new MySQL table called `departments`. Your table should include the following columns:

1. Run the Node app called `bamazonSupervisor.js` to access a list of menu options:

   * View Product Sales by Department
   * Create New Department

2. A new `total_profit` column SHOULD calculate and display the difference between `over_head_costs` and `total_sales` (although `total_profit` is not stored in any database -- so don't go looking for it!). 
	* I'm having trouble with this last step! Hope to resolve in next hour. :)

### Happy shopping!
