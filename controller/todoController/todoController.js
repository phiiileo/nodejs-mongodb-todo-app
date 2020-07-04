const bodyParser = require('body-parser');
const Todo = require("./../../model/todoModel")



const urlencodedParser = bodyParser.urlencoded({
    extended: false
});
const jsonParser = bodyParser.json()

// Get Data handler
const getAllTodos = () => {
    return Todo.find()
}

module.exports = (app) => {

    app.get("/todos", urlencodedParser, (req, res) => {

        // load data handler
        const getData = (err, data) => {
            if (err) throw err
            loaddata(data)
        }

        // Get Data from DB
        const allTodos = getAllTodos();
        allTodos.exec(getData);

        // Send Data to view handler
        const loaddata = (todoData) => {
            res.render('todos', {
                todos: todoData
            })
        }
    });

    // Add Todo Data
    app.post('/todos', urlencodedParser, (req, res) => {
        console.log(req.body.new_task);

        // Create New document
        Todo.create({
            text: req.body.new_task,
            done: false
        }, (err, data) => {
            if (err) throw err;
            new_todo = data;

            // Fetch All data
            getAllTodos().exec((err, data) => {
                loadResponse([
                    ...data
                ])
            })
        })

        // Send response to View
        const loadResponse = (data) => {
            console.log(data);
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