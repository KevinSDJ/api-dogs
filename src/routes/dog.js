const {Router}= require('express');
const {createDog} =require('../controllers/dog')
const {autho} =require('../middleware/autho.js')


const router= Router()

router.post('/dog',autho,createDog)


module.exports=router