// require the library
const mongoose = require('mongoose');
//connect to db
mongoose.connect('mongodb://localhost/todo_list_db');
//acuire the connection to check if it is succesful
const db = mongoose.connection;
//error
db.on('error' , console.error.bind(console , 'error connectiong to db'));
//up and running then print the message
db.once('open' , function(){
    console.log("succesfully connected to db")
})

