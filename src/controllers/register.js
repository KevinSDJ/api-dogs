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
            return res.status(400).json({error:"Las credenciales ya estan registradas"})
        }
        if(created){
            res.status(200).json({success:true})
        }
        

    
    }catch(e){
        res.status(400).json(new Error("Fallo al registrar el usuario"))
    }
    
}

module.exports={regist}