const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.use(express.static('public'));
app.use(express.static('img'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/Main.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/Appitizer.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/Dessert.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/Drink.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
