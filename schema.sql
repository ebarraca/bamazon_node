
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(200) NOT NULL,
  price INTEGER (11) NOT NULL,
  stock_quantity INTEGER (11) NOT NULL,
  PRIMARY KEY (id)
);


