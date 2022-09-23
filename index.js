// Requiring the Express 
const express = require("express");
// Path of current directory
const path = require("path");
// Port number on which my server is running
const port = 8000;
//Require database
const db = require('./config/mongoose')
//Require Todo
const todo = require('./models/todo')
//Setting up the App
const app = express();

//Setting up the view engine
app.set("view engine", "ejs");
//Joining the path
app.set("views", path.join(__dirname, "views"))
//Use the public Folder
app.use(express.static(path.join(__dirname , "public")))
//Parsing data 
app.use(express.urlencoded());

// Listening on the port and check wheteher my server is running fine or not
app.listen(port, function (err) {
  if (err) { // on error
    console.log(`Error : ${err}`);
  }
  // Succesfully running
  console.log(`Yup! Server is running on port ${port}`);
});

//Getting request from home page for rendering
app.get('/' , function(req , res){
    todo.find({}, function(err , task){
         if(err){ // on error
            console.log("Error in fetching contact in db");
            return;
         }
         //rendering the home page
         return res.render('home' , {
            todo_list : task
         })
    })
})

//Creating a TODO
app.post('/create-todo' , function(req , res){
     // Creating the todo with callback function
      todo.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date,
        workdone:false
      },function(err , newTask){
        // if error occurs
          if(err){
            console.log(`Error in Creating the Contact ${err}`);
            return;
          }
        // no error success
          return res.redirect('back');        
      })
})

// FOr deleting the task
app.get('/delete-tasks/', function(req, res)
{
      // Selecting the checked tasks to delete
      todo.deleteMany({workdone:true} , function(err , tasks){
           if(err){ // on Error
            console.log("error" , err);
            return;
           }
           console.log(tasks);
      })
      // Go back to home page
      return res.redirect('back');
});

// FOR checked or unchecked the checkbox
app.get('/task-done/:id' , function(req , res){
  // Take the id
    let id = req.params.id;
    console.log(id);
  //Find id
    todo.findById(id , function(err , task){
         if(err){
          console.log("ERROR" , err);
          return;
         }
         console.log(task);
         //Toogle the task
         if(task.workdone){
            task.workdone = false;
         }else{
          task.workdone = true;
         }
         //Save the task
         task.save();
    })
    // GO back to home
    return res.redirect('back');
})