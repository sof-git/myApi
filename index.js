const mongoose = require('mongoose');
const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 1000;
const client = mongodb.MongoClient;


app.use(cors());

app.use(express.urlencoded({
    extended: true
  }));

app.use(express.json());

const mongoURI = "mongodb://127.0.0.1:27017/myTodos";

mongoose.connect(mongoURI, {useNewUrlParser:true})
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
