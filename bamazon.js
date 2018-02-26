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
    startBamazon = function(){

        connection.connect(function(err) {
          if (err) throw err;
          connection.query("SELECT * FROM products", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            //console logs array of objects - how to beautify this to make it a clean list?
          });
        });

    }
    startBamazon();

    function userInputId() {
      inquirer
        .prompt({
          name: "id",
          type: "input",
          message: "What is the ID of the item you'd like to buy?"
        })
        .then(function(input) {
        //user types answer //
        })
    };
    userInputId();

    function userInputQty() {
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
        //display customer total price
        })
    };
    userInputQTY();
