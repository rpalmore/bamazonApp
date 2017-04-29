CREATE DATABASE bamazon;

CREATE TABLE bamazon.products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(255) NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE bamazon.departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  overhead_costs DECIMAL(10,2) NULL,
  total_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity)
VALUES ("JavaScript Book", "Books", 10, 25), ("Umbrella", "Housewares", 12, 10), 
("Cat Food", "Pets", 2, 55), ("Laptop", "Electronics", 435.99, 4), ("Cheez Whiz", "Food & Drink", 1.99, 12), 
("Shampoo", "Beauty", 5.50, 99), ("Yoga Mat", "Recreation", 16.50, 34), ("Skinny Jeans", "Apparel", 22, 45), 
("Beach Towel", "Seasonal", 11, 56), ("Magic Vitamins", "Pharmacy", 27.95, 1);

INSERT INTO bamazon.departments (department_name, overhead_costs)
VALUES ("Books", 1000), ("Housewares", 250), ("Pets", 300), ("Electronics", 25), ("Food & Drink", 1200), 
("Beauty", 75), ("Recreation", 33), ("Apparel", 34), ("Seasonal", 55), ("Pharmacy", 42);

SELECT * from bamazon.products;

SELECT * from bamazon.departments;



DROP TABLE bamazon.products;

DROP TABLE bamazon.departments;







