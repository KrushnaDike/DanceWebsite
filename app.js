const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyparser = require("body-parser");

const app = express();
const port = 80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS RELATED STUFF
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// PUG RELATED STUFF
app.set("view engin", "pug");
app.set("views", path.join(__dirname, "views"));

// ENDPOINTS
app.get("/", (req, res) => {
    // param = { }
    res.status(200).render("home.pug");
});

app.get("/contact", (req, res) => {
    // param = { }
    res.status(200).render("contact.pug");
});

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Data was not saved to the database")
    });

    // res.status(200).render("contact.pug");
});

// app.post("/contact", (req, res) => {
//     name = req.body.name
//     email = req.body.email
//     phone = req.body.phone
//     address = req.body.address
//     desc = req.body.desc

//     let outputToWrite =
//     `
//     Nmae: ${name}
//     Email: ${email}
//     Phone number: ${phone}
//     Address: ${address}
//     Concer: ${desc}
//     `
//     fs.writeFileSync("output.txt", outputToWrite)
//     // param = { }
//     res.status(200).render("contact.pug");
// });


// LISTINING PORT
app.listen(port, () => {
    console.log(`This application started successfully at port: ${port}`);
});