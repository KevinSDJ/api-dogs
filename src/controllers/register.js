const {User} =require('../db');
const bcrypt= require('bcrypt')


const regist=async (req,res)=>{
    try{
        let {email}= await req.body
        let password= await bcrypt.hash(req.body.password,5)
        let {username}= req.body
        let [user,created]= await User.findOrCreate({
            where:{email:email},
            defaults:{
                password,
                username
            }
        })
        if(!created){
            return res.status(400).json({type:"error",msg:"User already register"})
        }
        if(created){
            res.status(200).json({type:'success',msg:"User register successfull"})
        }
    
    }catch(e){
        res.status(500).json({type:"error",msg:"Failed to register "})
    }
    
}

module.exports={regist}