const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "crud-application"
});

app.post("/create", (req, res) => {
    const itemName = req.body.itemName;
    const itemAmount = req.body.itemAmount;

    db.query(
        "INSERT INTO inventory (item_name, item_amount) VALUES (?,?)", 
            [itemName, itemAmount], 
                (err, result) => {
                    if (err) {
                        console.log(err);
            } else {
                res.send("Item Added");
            } 
        }
    );
});

app.get("/items", (req, res) => {

    db.query(
        "SELECT * FROM inventory", 
        (err, result) => {        
        if (err) {            
            console.log(err);            
        } else {    
            res.send(result);   
        }     
      }  
    );    
  });  

app.put("/update", (req, res) => {
    const id = req.body.id;
    const itemAmount = req.body.itemAmount;

    db.query(
      "UPDATE inventory SET item_amount = ? WHERE id = ?",
      [itemAmount, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM inventory WHERE id = ?", id,
    (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});

app.listen(3001, () => {
    console.log("running on port 3001");
});