const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

console.log(process.env.mongodbUrl)
mongoose.connect(process.env.mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(data => {
        console.log("Connected to the DB successfully")
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