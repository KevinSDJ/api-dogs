const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt');
const {User}= require('../db');
require('dotenv').config()



const {SECRET_}=process.env
const login=async (req,res)=>{
    console.log("estamos en el login")
  
    const {password,email}= req.body
    const user= await User.findOne({where:{email:email}})
    if(!user){
        return res.status(404).json({type:"error",msg:"User not register"})
    }   
    const verfPass=await bcrypt.compare(password,user.password)
    if(!verfPass){
        return res.status(401).json({type:"error",msg:"Password invalid"})
    }
    const tknUser={
        id:user.id,
        username:user.username,
        email:user.email
    }
    
    const Token=  jwt.sign(tknUser,SECRET_,{expiresIn:60*60*24})
    res.status(200).json({type:"success",msg:"login success",user:tknUser,Token})
}

module.exports={login}