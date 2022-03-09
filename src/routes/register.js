const {Router} = require('express')
const {regist} = require('../controllers/register')

const router= Router()


router.post('/register',regist)

module.exports=router