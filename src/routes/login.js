const {Router} = require('express')
const {verifySession} =require('../middleware/verifySession')
const {login} =require('../controllers/login')

const router=Router()

router.post('/login',verifySession,login)



module.exports=router