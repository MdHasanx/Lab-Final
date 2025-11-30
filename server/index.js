const express = require("express");
const mysql = require ("mysql");
const cors = require("cors");

const port = 5000;

const app = express();

//middlewares

app.use(cors());
app.use(express.json());

 //making connection with MySQL server

 var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'postbook2',
});
 
db.connect((err) => {
  if (err) {
    console.log("Something went wrong while connecting to database: ", err);
    throw err;
  }
  else{
    console.log("MySQL server connected...");
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
