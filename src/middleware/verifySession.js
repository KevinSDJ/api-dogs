const jwt =require('jsonwebtoken')
const {User} =require('./../db.js')
require('dotenv').config()


let verifySession= (req,res,next)=>{
	let Token= req.headers['authorization']?.split(" ")[1]
	let {SECRET_}=process.env 
	if(Token){
		jwt.verify(Token,SECRET_,async (err,decode)=>{
			if(decode){
				console.log(decode)
				let {email}=decode
				let user = await User.findOne({where:{email:email}})
				res.status(200).json({success:true,user:{id:user.id,email:user.email}})
			}
			if(err){
				console.log(err)
				res.status(401).json({success:false,error:err})
			}
		})
		return
	}else{
		console.log("No hay Token")
	    next()
	}
   }
module.exports={verifySession}
