const express = require("express");
const {addVideo,updateVideo,deleteVideo,getVideo,trend,sub,random, getByTag, search} = require("../controllers/video.js");
const { verifyToken } = require("../verifyToken.js");

const router = express.Router();

router.post("/",verifyToken,addVideo);

router.put("/:id",verifyToken,updateVideo);

router.delete("/:id",verifyToken,deleteVideo);

router.get("/find/:id",getVideo);

router.get("/trend",trend);

router.get("/random",random);

router.get("/sub",verifyToken,sub)

router.get("/tags",getByTag)

router.get("/search",search)

module.exports = router;