import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;


const db = new pg.Client({
    user: "user",
    host: "host",
    database: "database",
    password: "password",
    port: 5432,
  });
  
  db.connect();
  
var currentOrder = {};
var orders = [];

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));


    //make login page to manager page

    // GET home page
app.get("/", (req, res) => {
  res.render("login.ejs");
});


  var password = "";
  //log in to manager page
app.post("/login", (req, res)=> {

  password = req.body.password;

    if(password == "manager"){
      res.render("index.ejs");
    } 
    else if(password == "team"){
      res.render("general.ejs");
    } 
    else{
      //res.end()
      res.redirect("/");
    }
});


//parsing the date

/*
//get day
async function getDay(){
   var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
if(today.getDate()< 10){
  dd = "0" + dd;
}
if(mm < 10){
    mm = "0" + mm;
  }
var yyyy = today.getFullYear();

return today =  yyyy + '-' + mm + '-' + dd ;
}
*/



//manager side
app.post("/add", async (req, res) => {

    currentOrder = req.body;

    console.log(currentOrder);

    await db.query(
    "INSERT INTO orders (name, contact, orders, payment_status) VALUES($1, $2, $3, $4)", 
    [currentOrder.name, currentOrder.contact, currentOrder.order, 'unpaid']);

    res.render("index.ejs");
  });

  // why see all click twice??

  app.post("/seeAllOrders", (req, res)=> {

    db.query("SELECT * FROM orders ORDER BY id DESC LIMIT 10", (err, res) => {
        if (err) {
          console.error("Error executing query", err.stack);
        } else {
          orders = res.rows;
        }
      });
    
    const data = {
        order: orders
    };

    res.render("index.ejs", data);

  });


  //team side

  
  app.post("/seeAllOrdersTeam", (req, res)=> {

    db.query("SELECT * FROM orders ORDER BY id DESC LIMIT 10", (err, res) => {
        if (err) {
          console.error("Error executing query", err.stack);
        } else {
          orders = res.rows;
        }
      });
    
    const data = {
        order: orders
    };

    res.render("general.ejs", data);

  });
  

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
