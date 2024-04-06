import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "database",
    password: "password",
    port: 5432,
  });
  
  db.connect();
  
  var orders = [];
  var currentOrder = "";

  app.get("/api", async (req, res)=> {

    try{
        orders = await db.query("SELECT * FROM orders ORDER BY id DESC LIMIT 30");
        const data = orders.rows;
        res.json({data});
    }
    catch (err){
        console.error(err.message)
    }

  });

  app.get("/lastId", async (req, res)=> {

    try{
        orders = await db.query("SELECT id FROM orders ORDER BY id DESC LIMIT 1");
        const data = orders.rows[0];
        res.json(data.id);
    }
    catch (err){
        console.error(err.message)
    }
  });


  app.post("/add", async (req, res) => {

    const currentOrder = req.body;
    
    try{
    console.log(currentOrder);

    const results = await db.query(
      "INSERT INTO orders (name, contact, orders, payment_status) VALUES($1, $2, $3, $4)", 
      [currentOrder.name, currentOrder.contact, currentOrder.orders, 'unpaid']);

    res.status(201).json({
  status: "success",
  data:{
    order:results.rows
  }});

    }

   catch (err){
    console.error(err.message);
}

  });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
