const { Router } = require('express');
const dogs=require('../routes/dogs');
const temperaments= require('../routes/temperaments');
const dog=require('../routes/dog');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(dogs)
router.use(temperaments)
router.use(dog)


module.exports = router;
