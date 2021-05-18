const router = require("express").Router();

//import jwt middleware
const isAuth = require("../jwt/isAuth");

//import models
const user = require("../models/user");

//import controllers

const authController = require("../controllers/auth");

router.post("/signup", authController.Signup);

module.exports = router;