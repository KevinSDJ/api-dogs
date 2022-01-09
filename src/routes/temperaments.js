const {Router}= require('express');
const {getTemps} =require('../controllers/temperaments')

const router= Router()

router.get('/temperament',getTemps)



module.exports=router