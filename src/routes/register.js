const {Router} = require('express')
const {regist} = require('../controllers/register')

const router= Router()


router.post('/register',(req,res,next)=>{
    const {username,email,password}=req.body
    if(username&&email&&password){
        next()
    }else{
        return res.json({error:"Error credential not availble"})
    }
},regist)

module.exports=router