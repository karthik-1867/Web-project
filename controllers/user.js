const { createError } = require("../error")
const User = require("../models/User");
const Video = require("../models/Video")
const bcrypt = require("bcrypt")

const updateUser = async(req,res,next) => {
   if(req.params.id == req.user.id){
     try{
        //for latest result of update values use new true

        console.log(req.body)
        if(req.body.password){
                  const salt = bcrypt.genSaltSync(10);
                  const hash = bcrypt.hashSync(req.body.password,salt);
                  console.log("hashed pass"+hash)
                  req.body.password = hash;
        }

        console.log(req.body)

        const updateUser = await User.findByIdAndUpdate(req.user.id,{$set : req.body},{new:true});

        res.status(200).json(updateUser);
     }catch(err){
      return next(createError(403,"error occured while updating"))
     }
   }
   else{
    return next(createError(403,"u can update only ur account"))
   }
}

const deleteUser = async(req,res,next) => {
  if(req.params.id == req.user.id){
    try{
       await User.findByIdAndDelete(req.user.id);
       return res.status(200).json("user has been deleted");
    }catch(err){
     return next(createError(403,"error occured while updating"))
    }
  }
  else{
   return next(createError(403,"u can update only ur account"))
  }
}

const getUser = async (req,res,next)=>{
    try{
        //always remember to user await
        const user = await User.findById(req.params.id)
        return res.status(200).json(user);
    }catch(err){
        next(createError(404,"user does not exist"))
    }
}

const subscribe = async (req,res,next) => {
  try{

      if(req.user.id != req.params.id){

        await User.findByIdAndUpdate(req.user.id,{
          $addToSet : {subscribedUsers : req.user.id}
        })
        
        console.log("reached here")
        await User.findByIdAndUpdate(req.params.id,{
          $inc : {subscribers :1}
        })
      }else{
         next(createError(404,"u cant subscribe urself"));
      }
        
      return  res.status(200).json("subscription successful")
  }catch(err){
     next(createError(404,"couldnt subscribe"))
  }
}

const unsubscribe = async (req,res,next) =>{
    try{

      if(req.user.id != req.params.id){

        await User.findByIdAndUpdate(req.user.id,{
          $pull : {subscribedUsers : req.user.id}
        })
        
        console.log("reached here")
        await User.findByIdAndUpdate(req.params.id,{
          $inc : {subscribers :-1}
        })
      }else{
        next(createError(404,"u cant subscribe urself"));
      }
        
      return  res.status(200).json("subscription successful")
  }catch(err){
    next(createError(404,"couldnt subscribe"))
  }
}

const like = async(req,res,next) =>{
   const id = req.user.id;
   const videoId = req.params.id;

   try{
     await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
     })

     res.status(200).json("the video has been liked")
   }catch(err){
    next(createError(404,"error in like"));
   }

}

const disLike = async(req,res,next)=>{
  const id = req.user.id;
  const videoId = req.params.id;

  try{
    await Video.findByIdAndUpdate(videoId,{
     $addToSet:{dislikes:id},
     $pull:{likes:id}
    })

    res.status(200).json("the video has been disliked")
  }catch(err){
   next(createError(404,"error in like"));
  }

}



module.exports = {updateUser,deleteUser,getUser,subscribe,unsubscribe,like,disLike}