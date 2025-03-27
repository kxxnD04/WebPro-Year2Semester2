const express = require("express");
const path = require("path");
const port = 3000;

// Creating the Express server
const app = express();

// static resourse & template engine
app.use(express.static("views"));
// Set EJS as templating engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const endpoint = 'http://10.0.15.21:8000/countries';    
    fetch(endpoint)
        .then(response => response.json())
        .then(country => {
            console.log(country);
            res.render('country', { data: country });         
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(port, () => {
  console.log(`This Web Server is running on port ${port}`);
});
