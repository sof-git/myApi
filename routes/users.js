const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/register', async (req,res)=>{
    const userSchema = Joi.object({
        firstname:  Joi.string().required(),
        lastname:   Joi.string().required(),
        email:      Joi.string().email().required(),
        password:   Joi.string().min(8).required(),
        birthdate:  Joi.date()
    })
    const { value , error } =  userSchema.validate(req.body);
    if (error){
        console.log(error);
        return res.status(400).send(error.details[0].message)
    }
    try {
        const userExists = await Users.findOne({email : value.email})
        
        if (userExists){
            res.status(409).send('A user with this email already exists');
        }
        else {
            value.password = bcrypt.hashSync(value.password,saltRounds)
            Users.create(value)
            .then( user =>{
                res.status(200);
                res.json({message: 'User have been registered', user:user
                })
            })
        }
    }
    catch(err){
        throw err;
    }
})


module.exports = router;
