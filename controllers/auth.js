
const mongoose = require("mongoose")
//made mistake here by keeping named export {User} this did not exist
const User = require("../models/User");
const bcyrpt = require("bcrypt");
const {createError} = require("../error.js");
const jwt = require("jsonwebtoken");

const signup = async(req,res,next) => {
    try {

        const salt = bcyrpt.genSaltSync(10);
        const hash = bcyrpt.hashSync(req.body.password,salt);
        const newUser = await new User({...req.body,password:hash});
        await newUser.save();
        return res.status(200).send("user has been created");
    }catch(err){
       next(createError(404,"user exist"))
    }
}

const signin = async(req,res,next) => {
    try {
        const user = await User.findOne({name:req.body.name});
        if(!user) return next(createError(404,"user does not exist"))

        const isPassword = await bcyrpt.compare(req.body.password,user.password)
        console.log(isPassword)
        if(!isPassword) return next(createError(404,"Password in correct"))

        const token = jwt.sign({id:user._id},process.env.JWT);

        const {password,...other} = user._doc;
        console.log("reached up till here")
        return res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).send(other)

    }catch(err){
       next(createError(404,err.message))
    }
}

const googleAuth = async (req,res,next) => {
   try{
       const user = await User.findOne({email:req.body.email});
   
       if(user){
         const token = jwt.sign({id:user._id},process.env.JWT);
         return res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).send(user._doc);
       }else{
         const newUser = new User({
            ...req.body,
            fromGoogle:true
         })

         const savedUser = await newUser.save();

         const token = jwt.sign({id:savedUser._id},process.env.JWT);
         return res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).send(savedUser._doc);
         
       }
   }catch(err){
     next(createError(404,"user doesnt exist"))
   }
}

module.exports = {signup,signin,googleAuth};