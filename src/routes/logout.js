const { logout } = require('../controllers/logout')

const {Router}= require('express')


const router= Router()

router.get('/logout',logout)



module.exports=router