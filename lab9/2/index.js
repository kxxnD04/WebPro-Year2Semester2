// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require('./dbconn.js');

// static resourse & template engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// routing 


app.get('/show', function (req, res) {

    // ให้แสดงข้อมูล จาก table instructor และ teaches
    // ดังนี้ ID name dept_name course_id semester year

    const sql = ' select * from users; ';
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result })
        res.end()
    })
});

app.get("/process_get", function (req, res) {
    let formdata = {
      user: req.query.username,
      password: req.query.password,
    };
  
    console.log("Received Data:", formdata);
  
    if (!formdata.user || !formdata.password) {
      return res.status(400).send("Invalid input data.");
    }
  
    let sql = `SELECT * FROM users WHERE username = ? OR email = ?`;
  
    conn.query(sql, [formdata.user, formdata.user], function (err, result) {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Database error.");
      }
      // console.log(result);
      
      if (result.length === 0) {
        res.send("ไม่พบบัญชีผู้ใช้");
        return;

      }if (result[0].password != formdata.password){
        res.send("รหัสผ่านไม่ถูกต้อง");
        return;
      }
      console.log("Login successfully.");
      res.send("Login successfully.");
    });
  });

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
