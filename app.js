const express = require('express');
const mongoose = require('mongoose');
const todoController = require("./controller/todoController/todoController")
const dotenv = require('dotenv').config()
const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/about", (req, res) => {
    res.render("about")
});

todoController(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server up and running at Port ${PORT}...`)
});