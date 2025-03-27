// use session
const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const PORT = 3000;
const app = express();

let db = new sqlite3.Database("customers.db", (error) => {
    if (error) {
        return console.error(error.message);
    }
    console.log("Connected to the SQLite database.");
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }
}));

app.get("/", (req, res) => {
    const query = `SELECT * FROM customers WHERE CustomerId = 10;`;
    db.get(query, (error, result) => {
        if (error) {
            console.log(error.message);
        }
        res.render("show", { data: result });
    });
});

app.get("/showdata", (req, res) => {
    if (!req.session.customer) {
        return res.render("show", { data: {
            CustomerId: "",
            FirstName: "",
            LastName: "",
            Address: "",
            Email: "",
            Phone: "",
        } });
    }
    let customer = req.session.customer;
    const formatdata = {
        CustomerId: customer.EID,
        FirstName: customer.Firstname,
        LastName: customer.Lastname,
        Address: customer.Address,
        Email: customer.Email,
        Phone: customer.Phone,
    };
    res.render("show", { data: formatdata });
});

app.get("/cleardata", (req, res) => {
    req.session.destroy(() => {
        res.render("show", { data: {
            CustomerId: "",
            FirstName: "",
            LastName: "",
            Address: "",
            Email: "",
            Phone: "",
        } });
    });
});

app.post("/savedata", (req, res) => {
    req.session.customer = req.body;
    res.render("show", { data: {
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