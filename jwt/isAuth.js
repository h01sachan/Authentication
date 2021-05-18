const jwt = require("jsonwebtoken");
const createError = require('http-errors')
const dotenv = require('dotenv')
dotenv.config()

module.exports = (req, res, next) => {

    const {authorization}=req.headers
  //  console.log(authorization);
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.split(" ")[1];
    //console.log(token)
    // let decodedToken;
    jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err,payload)=>{
        if(err){
            return res.status(401).json(err)
        }
        //payload contains data which is stored in token
        req.User = payload;
        next();
        
    })
};

