const express = require("express");
const mysql = require ("mysql");
const cors = require("cors");

const port = 5000;

const app = express();

//middlewares

app.use(cors());
app.use(express.json());

 //making connection with MySQL server

 let db = mysql.createConnection({
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

//getting user data from server

app.post("/getUserInfo", (req, res) => {
  
  const { userId, password } = req.body;

  const getUserInfosql = 'SELECT userid, userName, userImage FROM users WHERE users.userId = ? AND users.userPassword = ?';

  let query = db.query(getUserInfosql, [userId, password], (err, result) => {
    if (err) {
      console.log("Error getting user info from server: ". err);
      throw err;
    }
    else{
      res.send(result);
    }
  });
});

app.get("/getAllPosts", (req, res) => {
  const sqlForAllPosts = `SELECT users.userName AS postedUserName, users.userImage AS postedUserImage, posts.postedTime, posts.postText, posts.postImageUrl FROM posts INNER JOIN users ON posts.postedUserId=users.userid ORDER BY posts.postedTime DESC`;

  let query = db.query(sqlForAllPosts, (err, result) => {
    if (err) {
      console.log("Error loading all posts from database: ", err);
      throw err;
    }
    else{
      console.log(result);
      res.send(result);
    }
  });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
