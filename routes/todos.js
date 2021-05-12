const express = require('express');
const router = express.Router();
const cors = require('cors');
const Todos = require('../models/Todos');

router.use(cors());

router.get('/todos',(req,res)=>{
    Todos.find({}).then(todos =>{
        if(!todos){
            return res.status(404).json({
                message:'todos not found'
            })
        }
        return res.status(200).json({
            todos:todos
        })
    })
})

router.post('/addTodo', async (req,res) =>{
    let data = req.body;

    try {
        const todoExists = await Todos.findOne({name : data.name})
        
        if (todoExists){
            res.status(409).send('A todo with this name already exists');
        }
        else {
            Todos.create(data)
            .then( todo =>{
                res.status(200);
                res.json({status: 'The todo has been added', todo:todo
                })
            })
        }
    }
    catch(err){
        next(err);
    }

})


router.get('/getTodo',(req,res)=>{
    Todos.findOne({ name : req.query.name })
        .then(todo => {
            return res.status(200).json({
                todo:todo
            })
        })
})

router.delete('/deleteTodo', (req,res) => {

     Todos.deleteOne({ _id:req.body.id})
        .then( todo =>{
            res.json({status:`The Todo ${todo.name} has been removed`})
        })
        .catch( err => {
            res.send('error',err);
        })
    
    
})

router.post('/updateTodo', async (req,res,next) => {
    try{
        const updates = req.body;
        const updated = await Todos.findOneAndUpdate({_id:req.body.id},updates,{new:true})
        if(updated){
            //res.sendStatus(200);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(200,updated)//.redirect('http://localhost:3000/todoDetails/'+ updated.name);
        }
    }catch (err) {
      return next(err)
    }
})


module.exports = router;