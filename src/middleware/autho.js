const jwt =require('jsonwebtoken')
const {User} =require('./../db.js')


module.exports={autho:(req,res,next)=>{
	console.log(req.headers['authorization'])
	next()
}}
