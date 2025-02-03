const express = require("express");
const { testing, signup,signin, googleAuth } = require("../controllers/auth");


const router = express.Router();



//SIGNUP
router.post("/signup",signup)
//SIGNIN
router.post("/signin",signin)
//GOOGLE AUTH
router.post("/googleAuth",googleAuth);

module.exports = router;