const express = require ("express")
const ensureAuth = require("../middleware/ensureauth")
const upload = require("../config/multer");
const router = express.Router()

const { signupValidation,loginValidation }=require("../middleware/Authvalidation")

const { signup, login, apidata, updateProfile, logout, getProfile, getAlluser } = require('../controllers/AuthCon')

const { sendMessage, getConverstion, getMessage, markread, deleteMessage }= require('../controllers/chatXCon')

router.post("/login", loginValidation,login)

router.post("/signup", signupValidation,signup)

router.get("/logout", ensureAuth, logout)

router.put("/updateprofile", upload.single("image"), ensureAuth, updateProfile)

router.get("/getprofile", ensureAuth, getProfile)

router.get("/getAlluser/:query", ensureAuth, getAlluser)

router.post("/sendmessage", upload.single("image"), ensureAuth,sendMessage )

router.get("/conversations", ensureAuth, getConverstion)

router.get("/conversations/:conversasionId/message", ensureAuth, getMessage)

router.put("/message/read", ensureAuth, markread)

router.delete("/message/:messageId", ensureAuth, deleteMessage)
// router.get("/getprofile",getprofile)

module.exports =router

