const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('tdl.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", function (req, res) {
  const sql = `SELECT id, title, deadline, completed FROM todolist;`;

  db.all(sql, [], function (err, rows) {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Database error");
    }
    console.log(rows);
    res.render("ToDoList", { data: rows });
  });

  console.log("Show Table successfully.");
});

app.get("/form", function(req, res) {
    res.render("form");
});

app.post("/form", function(req, res) {
    console.log("Hello world")
    console.log(req.body)
    let formdata = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        completed: 0
      };
    
      console.log("Received Data:", formdata);
    
      if (!formdata.title || !formdata.description || !formdata.deadline) {
        return res.status(400).send("Invalid input data.");
      }
    
      let sql = `INSERT INTO todoList (title, deadline, completed) VALUES (?, ?, ?)`;

      
      db.run(sql, [formdata.title, formdata.deadline, formdata.completed], function (err) {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).send("Database error.");
        }
        console.log("Record inserted successfully.");
        res.redirect("/"); 
      });
      
});

app.get("/toggle/:id", function(req, res){
    console.log("toogle")
    const id = req.params.id;
  
    db.run(
      'UPDATE todolist SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END WHERE id = ?',
      [id],
      function(err) {
        if (err) {
          return console.error(err.message);
        }
        res.redirect('/');
      }
    );

})

app.listen(port, () => {
  console.log(`This Web Server is running on port ${port}`);
});
