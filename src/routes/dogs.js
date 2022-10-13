const {getAlldogs,getIfQuery,getIdraza} =require('../controllers/dogs')

const {Router} = require('express');




const router=Router()

router.get('/dogs',getIfQuery,getAlldogs)
router.get('/dogs/:idRaza',getIdraza)

module.exports=router