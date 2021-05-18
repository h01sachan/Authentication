const router = require("express").Router();

//import jwt middleware
const isAuth = require("../jwt/isAuth");

//import models
const user = require("../models/user");

//import controllers

const authController = require("../controllers/auth");

router.post("/signup", authController.Signup);
router.post("/signup/otp-check", authController.checkOTP);
router.post("/resendOtp", authController.resendOTP);
router.post("/login",authController.Login);
//auth check
router.post("/authcheck", [isAuth],authController.authCheck);
router.get("/getAllUsers",[isAuth],authController.GetAllUserList);

module.exports = router;