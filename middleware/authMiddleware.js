const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next)=>{

    const token = req.cookies.jwt;

    if (token){
        
    } else {
        res.redirect('/');
    }

}
