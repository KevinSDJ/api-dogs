const { Router } = require('express');
const dogs=require('../routes/dogs');
const temperaments= require('../routes/temperaments');
const dog=require('../routes/dog');
const login=require('../routes/login');
const register =require('../routes/register')
const logout=require('../routes/logout')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(register)
router.use(dogs)
router.use(login)
router.use(temperaments)
router.use(dog)
router.use(logout)


module.exports = router;
