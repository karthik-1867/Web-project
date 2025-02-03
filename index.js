const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("../Youtube_server/routes/users");
const videoRoute = require("../Youtube_server/routes/video");
const commentRoute = require("../Youtube_server/routes/comments");
const authRoute = require("../Youtube_server/routes/auth");
const cookieParser = require("cookie-parser");
const cors = require('cors');


const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongo");
  }).catch((err)=>{
    console.log(err);
  })
}


app.listen(8800,()=>{
    connect();
    console.log("listening on port 8800")
    console.log(process.env.MONGO_URL)
})


//cookie parser 
app.use(cookieParser());
app.use(cors());

//for parsing req bodies
app.use(express.json());

app.use("/api/user",userRoute);
app.use("/api/video",videoRoute);
app.use("/api/comments",commentRoute);
app.use("/api/auth",authRoute);

//err handling middle wre;

app.use((err,req,res,next)=>{

  const status = err.status || 500;
  const message = err.message || "something went wrong";
  return res.status(status).json({
    success:false,
    status,
    message
  })
})


