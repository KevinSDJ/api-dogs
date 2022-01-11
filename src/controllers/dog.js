const { Dog, Temperament, User } = require('../db');
const jwt = require('jsonwebtoken')
const {getCache,updateCache}= require('../cache/index')

const createDog = async (req, res) => {
    const { name, image, temperaments, weight, height, age } = req.body
    const { uid } = req.session
    console.log(uid)
    // verificar que el usuario este registrado y logeado
    if (!uid) {
        return res.status(401).json({ msg: "you are not authorized", type: "error" })
    }
    // desencriptar token y obtencion de datos necesarios
    const { email } = jwt.decode(uid)
    // si hay sesion y esta registrado busco el usario en el db
    let user = await User.findOne({ where: { email: email } })

    // verifico que los datos necesarios hayan llegado correctamente
    try {
        if (name && image && temperaments && weight && height && age) {
            // separo los temperamentos por defecto y los creados 
            const temp = temperaments.filter(e => Number(e))
            const newTemp = temperaments.filter(e => !Number(e))

            // creo la nueva raza
            let newRace = await Dog.create({ name, weight, height, age, image })

            await newRace.setUser(user)
            // agregos los temperamentos existentes seleccionados
            await newRace.addTemperament(temp)

            // si el usuario creo nuevos temperamentos los agregos aqui
            if (newTemp) {
                console.log(newTemp)
                let ntempCrtd = await Promise.all(newTemp.map(e => Temperament.create({ name: e }))).then(res => res)
                await newRace.addTemperament(ntempCrtd)
            }
            let racesDb=[]
            await Dog.findAll({where:{name:name},include:Temperament})
               .then(r=>{
                   r.map(e=>racesDb.push({id:e.id,name:e.name,height:e.height,weight:e.weight,age:e.age,image:e.image,userId:e.userId,temperament:e.temperaments.map(i=>{return i.name})}))
                   updateCache(racesDb[0])
                })
                
            res.status(200).json({ msg: "race created", type: "succes" })

        }
    } catch (e) {
        res.status(400).json({ error: new Error(e) })
    }




}

module.exports = { createDog }