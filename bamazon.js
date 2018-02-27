var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require ("prompt");
//new folder, package json, npm install mysql and inquirer

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

console.log("Welcome to Bamazon! These are the items we have for sale:");

function start(){
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;

        for(var i = 0; i<res.length;i++){
            console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }
        userInputId(res);
    })
}
start();

    function userInputId(res) {
      inquirer
        .prompt({
          name: "id",
          type: "input",
          message: "What is the ID of the item you'd like to buy?"
        })
        .then(function(userResponse) {
            for(var i = 0; i<res.length;i++){
                if (res.id==userResponse.id){
                    userInputQty(userResponse.id);
                }

            }
        })
    };

    function userInputQty(userResponseId) {
      inquirer
        .prompt({
          name: "id",
          type: "input",
          message: "How many would you like to buy?"
        })
        .then(function(input) {
        //user types answer //
        //check database to see if there is enough
        //if not enough - INSUFFICIENT
        //if there is enough, then update the SQL DB to reflect new QTY
        })
    };
    userInputQTY();
