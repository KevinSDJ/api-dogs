const {Router}= require('express');
const {createDog} =require('../controllers/dog')



const router= Router()

router.post('/dog',createDog)


module.exports=router