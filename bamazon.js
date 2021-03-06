var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require ("prompt");
var express= require ("express")
var bodyParser = require('body-parser')
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

var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
                if (res[i].id==userResponse.id){
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
            connection.query('SELECT * FROM products WHERE id=' + userResponseId, function(err, res){
                if (err) throw err;
                    for (var i = 0; i<res.length;i++){
                        if(res[i].stock_quantity < input.id){
                            console.log("Insufficient Quantity. Your order is cancelled.")
                        } else {
                            var price = (res[i].price * input.id)
                            console.log("Price for all items is " + price);
                            connection.query(
                              "UPDATE products SET ? WHERE ?",
                              [
                                {
                                  stock_quantity: (res[i].stock_quantity-input.id)
                                },
                                {
                                 id: userResponseId
                                }
                              ],
                              function(err, response) {
                                if (err) throw err;
                                console.log("Order successful!")
                                inquirer.prompt([
                                     {
                                         name: "yesOrNo",
                                         type: "rawlist",
                                         message: "Would you like to order anything else?",
                                         choices: ["Y", "N"]
                                     }])
                                     .then(function(inquirerResponse) {
                                         if (inquirerResponse.yesOrNo == "Y"){
                                             start();
                                             } else {
                                                 console.log("Thank you for your order!")
                                             }
                                     });
                        })

                    }
                }
        })
    });
}
