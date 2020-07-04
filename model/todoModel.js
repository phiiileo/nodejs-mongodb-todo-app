const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://phileo:admin_phileo@phileo-db.fqfdh.mongodb.net/node_todo_app?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch(error => {
        console.log(error)
    })


const TodoSchema = new mongoose.Schema({
    id: String,
    text: String,
    done: Boolean
})

const Todos = mongoose.model('todos', TodoSchema)

module.exports = Todos