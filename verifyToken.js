const jwt = require("jsonwebtoken")
const { createError } = require("./error")

const verifyToken = (req,res,next) => {

    console.log(req.cookies)
    const token = req.cookies.access_token

    console.log(token)
    if(!token) return next(createError(401,"Unauthenticated user"));

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(401,"Token is not valid"));
        
        req.user = user;
        next();

    })
}

module.exports = {verifyToken}