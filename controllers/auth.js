//import packages
//to handle async requests
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
//to send email
const nodemailer = require("nodemailer")
const nodemailersendgrid = require("nodemailer-sendgrid-transport")
const OtpGenerator = require("otp-generator");
const JWT = require("jsonwebtoken");

//regex
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

//import models
const User = require('../models/user');
const Otp = require('../models/otp');
const bodyParser = require('body-parser');

//sengrid
const transporter = nodemailer.createTransport(nodemailersendgrid({
    auth:{
        api_key: process.env.API_KEY
    }
}))

exports.Signup = asyncHandler ( async (req, res, next) => {

    const { name, email, password } = req.body;
    console.log(req.body);
    //all fields should be filled
    if (!email || !password || !name) {

        return res.status(422).json({Error : "Please fill all the fields"});
    }

    //check if email is valid or not
    var valid = emailRegex.test(email);

    if(!valid)
    {
        return res.status(422).json({error: "please enter a valid email"});
    }

    //check password length
    if(password.length < 6)
    {
        return res.status(422).json({error: "Password must be 6 character long"});
    }

    //check if user is already registered

    const checkUser = await User.findOne({email : email});

    if(checkUser)
    {
        return res.status(422).json({Error : "User already registered"});
    }

    //hashing password
    const hashedpassword = await bcrypt.hash(password, 12);

    //creating a new instance of user
    const newUser = new User({
        name: name,
        email: email,
        password: hashedpassword,
        isverified: false,
    });

    await newUser.save();

    //generate new otp
    let otp = OtpGenerator.generate(4, {
        alphabets: false,
        specialChars: false,
        upperCase: false,
    });
    //save otp
    const optdata = new Otp({
        email: email,
        otp: otp
    })
    await optdata.save();

    console.log(otp, "otp stored successfully");

    res.status(200).json({ Message: "User Successfully signed up , check your Email for Otp" });

    return transporter.sendMail({
        from: "sachan.himanshu2001@gmail.com",
        to: email,
        subject: "signup successful",
        html: `<h1>please verify your email using this otp : ${otp}</h1>`
    });

});