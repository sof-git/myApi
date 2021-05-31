const express = require('express');
const router = express.Router();
const Todos = require('../models/Todos');
const Joi = require('joi');


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
    const todoSchema = Joi.object({
        name:           Joi.string().min(4).required(),
        description:    Joi.string().min(1).required(),
        difficulty:     Joi.number(),
        creation_date:  Joi.date().required(),
        priority:       Joi.number()
    })
    const { value , error } =  todoSchema.validate(req.body);
    console.log(value,error)
    if (error){
        console.log(error);
        return res.status(400).send(error.details[0].message)
    }

    try {
        const todoExists = await Todos.findOne({name : value.name})
        
        if (todoExists){
            res.status(409).send('A todo with this name already exists');
        }
        else {
            Todos.create(value)
            .then( todo =>{
                res.status(200);
                res.json({status: 'The todo has been added', todo:todo
                })
            })
        }
    }
    catch(err){
        throw err;
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
        const updated = await Todos.findOneAndUpdate({_id:req.body.id},req.body,{new:true})
        if(updated){
            res.status(200).send(updated)
        }
    }catch (err) {
      return next(err)
    }
})


module.exports = router;