//  all necessary Imports
const express = require('express')
const port = 8000;
const db = require("./config/mongooes")
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))
app.use(express.static('assets'))

app.use(express.urlencoded({
    extended: true
}));

//will render homepage after every task list
app.get("/", function (req, res) {
    Tasks.find({}, function (err, task) {
        if (err) {
            console.log('Error in fetching task!')
            return;
        }
        res.render("home", {
            title: "Task List",
            contactList: task
        })
    })
})

const Tasks = require("./models/task");


app.post('/create-task', function (req, res) {
    Tasks.create({
        name: req.body.name,
        category: req.body.category,
        date: req.body.date
    }, function (err) {
        if (err) {
            console.log('Error in creating a task!')
            return;
        }
        return res.redirect('back');
    })
});

app.get("/delete-task", function (req, res) {
    //get the id from query in url
    let id = req.query.id;
    //find the task in the database using id and delete it
    Tasks.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Error in deleting a task!')
            return;
        }
        return res.redirect('back')
    })
})

app.get("/clear-task", function (req, res) {
    //get the id from query in url
    let id = req.query.id;
    alert(id)
    //find the task in the database using id and delete it
    Tasks.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Error in deleting a task!')
            return;
        }
        return res.redirect('back')
    })
})

//function to listen express server | port config
app.listen(port, function (error) {
    try {
        console.log("yup, my sever is running on", port)
    } catch (err) {
        console.log("Error running on server ", error)
    }
})