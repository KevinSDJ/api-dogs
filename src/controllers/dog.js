const { Dog, Temperament, User } = require('../db');
const {getCache,updateCache}= require('../cache/index')
const {cloudinary}= require('../utilities/cloudinary') 

const createDog = async (req, res) => {
    let { name, image, temperaments, weight, height, age } = req.body
  
    // verifico que los datos necesarios hayan llegado correctamente
    try {
        if (name && image && temperaments && weight && height && age) {
            // separo los temperamentos por defecto y los creados 
            const temp = temperaments.filter(e => Number(e))
            const newTemp = temperaments.filter(e => !Number(e))
            const cloudinaryResponse= await cloudinary.uploader.upload(image,(error,result)=>{
                if(error){
                    return res.status(400).json({type:"error",msg:"Failed to upload image",error})
                }
                if (result) {
                    image=result.secure_url
                }
            })


            // creo la nueva raza
            let newRace = await Dog.create({ name, weight, height,age,image})

            // agregos los temperamentos existentes seleccionados
            await newRace.addTemperament(temp)

            // si el usuario creo nuevos temperamentos los agregos aqui
            if (newTemp?.length>0) {
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
                
            res.status(201).json({type:"success",msg:"Race created"})

        }
    } catch (e) {
        res.status(500).json({type:"error",msg:e.TypeError})
    }




}

module.exports = { createDog }