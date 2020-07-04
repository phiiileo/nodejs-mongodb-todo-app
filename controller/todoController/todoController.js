const bodyParser = require('body-parser');
const todoData = require("./../../constantsData/todo");
const mongoose = require('mongoose');
const Todo = require("./../../model/todoModel")



const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const jsonParser = bodyParser.json()

const getAllTodos = () => {
    return Todo.find()
}

module.exports = (app) => {

    app.get("/todos", urlencodedParser, (req, res) => {

        const getData = (err, data) => {
            console.log(data);
            loaddata(data)
        }

        const allTodos = getAllTodos();
        allTodos.exec(getData);

        const loaddata = (todoData) => {
            res.render('todos', {
                todos: todoData
            })
        }
    });

    // Add Todo Data
    app.post('/todos', urlencodedParser, (req, res) => {
        console.log(req.body.new_task);

        Todo.create({
            text: req.body.new_task,
            done: false
        }, (err, data) => {
            if (err) throw err;
            console.log(data)
            new_todo = data;
            getAllTodos().exec((err, data) => {
                loadResponse([
                    ...data
                ])
            })
        })
        const loadResponse = (data) => {
            console.log(data);
            // res.end("Hello world")
            res.render('todos', {
                todos: data
            })
        }

    })

    app.put('/update-todos', jsonParser, (req, res) => {
        const {
            id,
            done
        } = req.body;
        console.log(id, done)
        Todo.updateOne({
            _id: id
        }, {
            done: done
        }, (err, data) => {
            if (err) throw err;
            sendResponse(req.body)
        })
        const sendResponse = (data) => {
            res.end(JSON.stringify({
                status: true,
                statusCode: 200,
                message: "Data Updated successfully!",
                data: data
            }))
        }

    })

    app.delete("/todos", jsonParser, (req, res) => {
        console.log("Delete req", req.body);
        Todo.deleteOne({
            _id: req.body._id
        }, (err, res) => {
            if (err) throw err;
            sendResponse(req.body)
        })
        const sendResponse = (data) => {
            res.writeHead(200)
            res.end(JSON.stringify({
                status: true,
                statusCode: 200,
                message: "Data deleted successfully!",
                data: data
            }))
        }

    })
}