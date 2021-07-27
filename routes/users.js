const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const maxAge = 2 * 24 * 60 * 60;

const createToken = (id) =>{
    return jwt.sign({id},'user token',{
        expiresIn: maxAge
    })
}


router.post('/register', async (req,res)=>{
    const userSchema = Joi.object({
        email:      Joi.string().email().required(),
        password:   Joi.string().min(8).required(),
    })
    const { value , error } =  userSchema.validate(req.body);
    if (error){
        console.log(error);
        return res.status(400).send(error.details[0].message)
    }
    try {
        const userExists = await Users.findOne({email : value.email})
        
        if (userExists){
            res.status(409).send({error:'A user with this email already exists'});;
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

router.post('/login', async (req,res)=>{
    const user = req.body;
    
    const userFound = await Users.findOne({email: user.email});
    
    if (!userFound) return res.status(400).json('Email or password is wrong !');

    const validPassword = await bcrypt.compare(user.password,userFound.password)

    if (!validPassword) return res.status(200).json('Email or password is wrong !')
    
    if (validPassword){
        const token = createToken(userFound._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge:maxAge * 1000});
        res.status(200).json({userFound});
    

    }
})


module.exports = router;
