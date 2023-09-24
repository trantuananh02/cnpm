const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const cors = require("cors");
app.use(cors());


let userHocTran = { id: 1, username: "hoctran", password: "12345678" };
//Login
app.post("/login", (req, res) => {
  if (
    req.body.username === userHocTran.username &&
    req.body.password === userHocTran.password
  ) {
    res.status(200).json({ msg: "Dang nhap thanh cong" });
    return;
  }
  res.status(400).json({ msg: "khong dang nhap thanh cong" });
});
//Dang ky
app.post("/register", checkLogin, (req, res) => {
  res.status(200).json({ text: "Day la PUT Request" });
});
//Get User By ID
app.get("/user/:id", checkLogin, (req, res) => {
  res.status(200).json({ text: "Xin chao Hoc Tran id cua ban la 1" });
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
