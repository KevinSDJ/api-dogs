const jwt =require('jsonwebtoken')
const {User} =require('./../db.js')
require('dotenv').config()

let {SECRET_} = process.env
module.exports={autho:(req,res,next)=>{
	console.log(req.headers['authorization'])
	let Token = req.headers['authorization']?.split(" ")[1]
	if(Token){
		jwt.verify(Token,SECRET_,(err,decode)=>{
			if(err){
				console.log(err)
				return res.status(401).json({success:false,msg:"Token expired"})
			}
			if(decode){
				console.log("en el decode antes del next")
				req.token= decode
				next()
			}
		})
	}else{
		console.log("esle de autho")
		res.status(401).json({success:false,msg:"Not authorization"})
	}
}}
