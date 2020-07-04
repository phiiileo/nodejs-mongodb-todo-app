const express = require('express');
const mongoose = require('mongoose');
const todoController = require("./controller/todoController/todoController")


const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/about", (req, res) => {
    res.render("about")
});

todoController(app)

app.listen(5000, () => {
    console.log("Server up and running at Port 5000...")
});