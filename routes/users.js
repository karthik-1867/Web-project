const express = require("express");
const {verifyToken} = require("../verifyToken.js");
const {updateUser,deleteUser, getUser, subscribe, unsubscribe,like, disLike} = require("../controllers/user.js")

const router = express.Router();

//update user
router.put("/:id",verifyToken,updateUser)

//delete user
router.delete("/:id",verifyToken,deleteUser)

//get a user
router.get("/:id",getUser)
//subscribe user
router.post("/:id/sub",verifyToken,subscribe)

//unsubscribe user
router.post("/:id/unsub",verifyToken,unsubscribe)

//like a video here id refers to video id
router.put("/:id/like",verifyToken,like)

//unlike a videp

router.put("/:id/dislike",verifyToken,disLike)

module.exports = router;