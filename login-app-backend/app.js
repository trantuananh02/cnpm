const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

//CONNECT TO DATABASE MYSQL

const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "my-secret-pw",
  database: "PUBLIC",
});

connection.connect(function (err) {
  if (err) throw err;
  let sql =
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL UNIQUE AUTO_INCREMENT, fullname VARCHAR(255), user_name VARCHAR(255), password VARCHAR(255), email VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  console.log("Connected!");
});

// DEFINE API
//Login
app.post("/login", (req, res) => {
  let resultSql;
  if (req.body.username && req.body.password) {
    let sqlUserSelect =
      "SELECT * FROM users WHERE user_name = ? AND password = ?";
    connection.query(
      sqlUserSelect,
      [req.body.username, req.body.password],
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        if (result && result.length < 1) {
          res.status(400).json({ msg: "Dang nhap khong thanh cong" });
          return;
        }
        res.status(200).json(result);
        return;
      }
    );
  }
});
//Dang ky
// app.post("/register", checkLogin, (req, res) => {
//   let sqlUser = "INSERT INTO users (id, fullname, user_name, password, email) VALUES (?, ?, ?, ?, ?)"

//   res.status(200).json({ text: "Day la PUT Request" });
// });
app.post("/register", (req, res) => {
  if (req.body.fullname && req.body.username && req.body.password && req.body.email) {
    let sqlUserInsert =
      "INSERT INTO users (id, fullname, user_name, password, email) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sqlUserInsert,
      [null, req.body.fullname, req.body.username, req.body.password, req.body.email],
      function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Đăng ký không thành công" });
        }
        return res.status(200).json({ msg: "Đăng ký thành công" });
      }
    );
  } else {
    return res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin" });
  }
});
//Get User By ID
app.get("/user/:id", checkLogin, (req, res) => {
  res.status(200).json({ text: "Xin chao id cua ban la 1" });
});

function checkLogin(req, res, next) {
  let isLogin = false;
  //logic kiểm tra đã đăng nhập hay chưa
  if (!isLogin) {
    res.send("Chua dang nhap");
    return;
  }
  next();
}

app.listen(3000);
