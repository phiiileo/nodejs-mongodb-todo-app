const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGODBURL, {
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