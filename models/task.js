const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    }
})


const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;