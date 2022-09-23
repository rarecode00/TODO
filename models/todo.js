const mongoose = require('mongoose')
//Schema for database to store
const todoSchema = new mongoose.Schema({
     description:{
        type: String,
        required:true
     },
     category:{
        type:String,
        required:true
     },
     date:{
        type:String,
        required:true
     },
     workdone:{
        type:Boolean,
        required:true
     }
})

const Task = mongoose.model('Task' , todoSchema);

module.exports = Task;