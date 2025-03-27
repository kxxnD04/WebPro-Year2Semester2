// use cookie
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 3000;
const app = express();
const sqlite3 = require('sqlite3').verbose();


let db = new sqlite3.Database('customers.db', (error) => {    
    if (error) {
        return console.error(error.message);
    }
    console.log('Connected to the SQlite database.');
  });
  
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(cookieParser());


app.get("/", (req, res) => {
    const query = `SELECT * FROM customers WHERE CustomerId = 20;`;
    db.each(query, (error, result) => {
        if (error) {
            console.log(error.message);
        }
        res.render('show', { data: result });
    });
});

app.get("/showdata", (req, res) => {
    if(!req.cookies.customer){
        return res.render('show', { data: {
            CustomerId: "",
            FirstName: "",
            LastName: "",
            Address: "",
            Email: "",
            Phone: "",
        } });
    }
    let customer = req.cookies.customer;
    const formatdata = {
        CustomerId: customer.EID,
        FirstName: customer.Firstname,
        LastName: customer.Lastname,
        Address: customer.Address,
        Email: customer.Email,
        Phone: customer.Phone,
    }
    res.render('show', { data: formatdata});
});

app.get("/cleardata", (req, res) => {
    res.clearCookie("customer");
    res.render('show', { data: {
        CustomerId: "",
        FirstName: "",
        LastName: "",
        Address: "",
        Email: "",
        Phone: "",
    } });
});

app.post("/savedata", express.urlencoded({ extended: true }), (req, res) => {
    const customer = req.body;
    res.cookie('customer', customer, { maxAge: 86400000 });
    res.render('show', { data: {
        CustomerId: "",
        FirstName: "",
        LastName: "",
        Address: "",
        Email: "",
        Phone: "",
    } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
