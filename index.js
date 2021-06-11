const mongoose = require('mongoose');
const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 1000;
const client = mongodb.MongoClient;
const cookieParser = require('cookie-parser');


app.use(cors());

app.use(express.urlencoded({
    extended: true
  }));

app.use(express.json());
app.use(cookieParser());

let mongoURI;
  if(process.env.NODE_ENV === "test"){
      mongoURI = "mongodb://127.0.0.1:27017/myTodosTest"
  } else {
      mongoURI = "mongodb://127.0.0.1:27017/myTodos"; 
  }
  mongoose.set('useFindAndModify', false);
mongoose.connect(mongoURI, {useNewUrlParser:true},{ useFindAndModify: false })
    .then(() =>{
        console.log('Connected to the TodoApp database')
    })
    .catch(err => console.log(err));

const routes = require('./routes/index.js');
app.use('/api',routes);

app.get('/',(req,res)=>{
    res.json('myTodos API');
})


app.listen(PORT, function(){
    console.log('myTodos API is running on PORT:',PORT);
});


module.exports = app;