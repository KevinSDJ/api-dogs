const jwt= require('jsonwebtoken')
const bcrypt= require('bcrypt');
const {User}= require('../db');
require('dotenv').config()



const {SECRET_}=process.env
const login=async (req,res)=>{
    try{
        const {password,email}= req.body
    const user= await User.findOne({where:{email:email}})
   
    const verfPass= !user? false: await bcrypt.compare(password,user.password)
    
    if(!verfPass&&!user){
        return res.status(401).json({msg:"Invalid credentials",type:"error"})
    }
    const tknUser={
        id:user.id,
        username:user.username,
        email:user.email
    }
    
    const Token=  jwt.sign(tknUser,SECRET_,{expiresIn:60*60*24})
    req.session.uid=Token
    res.status(200).json({type:"succes",user:{id:user.id,username:user.username,email:user.email}})
    }catch(e){
        res.status(400).json({msg:e,type:"error"})
    }
    
   
}

module.exports={login}