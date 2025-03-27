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
      username: req.query.username,
      password: req.query.password,
      email: req.query.email,
      firstname: req.query.firstname,
      lastname: req.query.lastname,
      age: Number(req.query.age),
      address: req.query.address,
      phone: req.query.phone
    };
  
    console.log("Received Data:", formdata);
  
    if (!formdata.username || !formdata.password || !formdata.email || !formdata.firstname || !formdata.lastname || formdata.age <= 0 || !formdata.address || !formdata.phone) {
      return res.status(400).send("Invalid input data.");
    }
  
    let sql = `INSERT INTO users (username, password, email, firstname, lastname, age, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    conn.query(sql, [formdata.username, formdata.password, formdata.email, formdata.firstname, formdata.lastname, formdata.age, formdata.address, formdata.phone], function (err, result) {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Database error.");
      }
      console.log("Record inserted successfully.");
      res.send("Record inserted successfully.");
    });
  });

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
