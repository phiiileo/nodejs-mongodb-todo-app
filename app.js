const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/about", (req, res) => {
    res.render("about")
});

app.get("/todos", (req, res) => {
    // console.log(req.body);
    const data = [{
        id: 1,
        text: "Walk the dog",
        done: true
    }, {
        id: 2,
        text: "Get the groceries",
        done: false
    }, {
        id: 3,
        text: "Prepare for dinner with babe",
        done: false
    }, {
        id: 4,
        text: "Clean the garden",
        done: true
    }, {
        id: 5,
        text: "Feed the dog",
        done: false
    }]
    res.render('todos', {
        todos: data
    })
});

app.listen(5000, () => {
    console.log("Server up and running at Port 5000...")
})