const { createError } = require("../error");
const User = require("../models/User.js");
const Video = require("../models/Video.js")

const addVideo = async(req,res,next) =>{
   const newVideo = new Video({userId:req.user.id, ...req.body});

   try{
     const savedVideo = await newVideo.save()
     res.status(200).json(savedVideo)
   }catch(err){
     next(createError(err))
   }
}

const updateVideo = async(req,res,next) => {

}

const deleteVideo = async(req,res,next)=>{

}

const getVideo = async(req,res,next) => {
    try{
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    }catch(err){
      next(createError(404,"not found"))
    }
}

const addView = async(req,res,next) =>{

}

const trend = async(req,res,next) =>{
   try{
      //  const videos = await Video.aggregate([{$sample:{size:1}}]);
       const videos = await Video.find().sort({Views:-1})
       res.status(200).json(videos);

   }catch(err){
     next(err);
   }
}
const sub = async(req,res,next) =>{
  try{
    console.log("reached sub")
    const user = await User.findById(req.user.id);
    const subscribedUser = user.subscribedUsers;

    console.log(subscribedUser)
    const list = await Promise.all(
      subscribedUser.map((id)=>{
        console.log("here id"+id);
        return Video.find({userId:id});
      })
    )

    console.log("list"+list)

    res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));

  }catch(err){
    next(createError(err))
  }
}
const random = async(req,res,next) =>{
   try{
     const videos = await Video.aggregate([{$sample:{size:100}}]);
     return res.status(200).json(videos);
   }catch(err){
     next(err)
   }

}

const getByTag = async(req,res,next)=>{

  // here req.query.tags simply return string sep by , but its single so conv into arr 
  console.log(req.query)
  const tags = req.query.tags.split(",");

  try{
    const videos = await Video.find({tags:{$in:tags}});
    res.status(200).json(videos);
  }catch(err){
   next(err)
  }

}

const search = async(req,res,next)=>{
 const query = req.query.q;
 console.log(query)

 try{
  const videos = await Video.find({title: {$regex : query, "$options":"i"}}).limit(10);

  res.status(200).json(videos);

 }catch(err){
   next(err)
 }

}
  
module.exports = {addVideo,updateVideo,deleteVideo,getVideo,addView,trend,sub,random,getByTag,search}