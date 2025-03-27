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

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/show', function (req, res) {

    // ให้แสดงข้อมูล จาก table instructor และ teaches
    // ดังนี้ ID name dept_name course_id semester year

    const sql = ' select * from instructor; ';
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result })
        res.end()
    })
});

app.get("/process_get", function (req, res) {
    let formdata = {
      id: req.query.id,
      name: req.query.name,
      deptname: req.query.deptname,
      salary: parseFloat(req.query.salary) || 0,  // Convert salary to number, default to 0 if NaN
    };
  
    console.log("Received Data:", formdata);
  
    if (!formdata.id || !formdata.name || !formdata.deptname || formdata.salary <= 0) {
      return res.status(400).send("Invalid input data.");
    }
  
    let sql = `INSERT INTO instructor (ID, name, dept_name, salary) VALUES (?, ?, ?, ?)`;
  
    conn.query(sql, [formdata.id, formdata.name, formdata.deptname, formdata.salary], function (err, result) {
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