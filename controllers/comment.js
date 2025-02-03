const { createError } = require("../error");
const Comment = require("../models/Comments");
const Video = require("../models/Video");

const addComment = async (req,res,next) => {
   try{
     const newComment = new Comment({...req.body,userId:req.user.id});
     console.log(newComment)
     const saveComment = await newComment.save();
     console.log("comment")
     res.status(200).json(saveComment)


   }catch(err){
    next(err)
   }
  
}

const deleteComment = async(req,res,next) => {
  try{
      console.log("inside delete comment")
      const comment = await Comment.findById(req.params.id);
      const video = await Video.findById(req.params.id);

      if(req.user.id==comment.userId||req.user.id === video.userId){
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("the comment deleted")
      }else{
        return next(createError(403,"U can delete only ur comment"));
      }

  }catch(err){
   next(err)
  }

}

const updateComment = async(req,res,next) => {
  try{
    console.log("inside update comment")
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    console.log("cuurnet userID"+req.user.id)

    if(req.user.id==comment.userId||req.user.id === video?.userId){
      const comment = await Comment.findByIdAndUpdate(req.params.id,{...req.body,userId:req.user.id},{new:true});
      res.status(200).json(comment)
    }else{
      return next(createError(403,"U can delete only ur comment"));
    }
      


  }catch(err){
   next(err)
  }

}

const getComment = async(req,res,next)=>{
  try{
    console.log("get a comment")
    const comment = await Comment.find({videoId:req.params.videoId});
    res.status(200).json(comment)
  }
  catch(err){
    next(err)
  }
}


  
module.exports = {addComment,deleteComment,updateComment,getComment}