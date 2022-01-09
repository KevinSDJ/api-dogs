require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { getCache, updateCache } = require('./../cache/index');




async function getAlldogs(req, res) {
    let cach = getCache()

    if (cach.length < 1) {
        let races=[]
        axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APPI_KEY}`)
            .then(resp => {
                resp.data.map(e=>races.push({
                    id:e.id,
                    name:e.name,
                    weight:e.weight.imperial,
                    height:e.height.imperial,
                    bred_for:e.bred_for,
                    breed_group:e.breed_group,
                    life_span:e.life_span,
                    temperament:e.temperament,
                    origin:e.origin,
                    image:e.image.url
                }))
                updateCache(races)
                return res.json(races)
            })
    }
    if (cach.length > 1) {
        res.status(200).json(cach)
    }
    


}
async function getIfQuery(req, res, next) {
    let { name } = req.query
    let cach = getCache()
    try{
        if (name) {
        if (cach.length < 1) {
            let race = await Dog.findOne({ where: { name: name } })

            if (race) {
                return res.status(200).json(race)
            } else {
                axios.get(`https://api.thedogapi.com/v1/breeds/search?name=${name}&api_key=${process.env.APPI_KEY}`)
                    .then(resp => {
                        if(resp.data.length<1){
                            res.status(404).json({ msg: "Race not found", type: "error" })
                        }else{
                            res.status(200).json(resp.data)
                        }
                    })
                    .catch(re => {
                        res.status(404).json({ msg:"Race not found", type: "error" })
                    })
                    return
            }
        } else {
            let rs;
            if(name.includes(" ")){
                rs=name.split(" ").map(e=> e=e[0].toUpperCase()+e.slice(1))
                rs= rs.join(" ")
            }else{
                rs=name.split("")[0].toUpperCase()+name.slice(1);
               
            }
     
            let d = cach.filter(e => e.name === rs)
            if (d?.length>0) {
                return res.status(200).json(d)

            } else {
                return res.status(404).json({error:"Not found"})
            }
        }


    }
    next()
    }catch(e){
        console.log(e)
    }
    


}


const getIdraza = (rq, rs) => {
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${process.env.APPI_KEY}`)
        .then(resp => {
            let r = resp.data.filter(e => e.id == rq.params.idRaza)
            rs.json(r)

        })
}


module.exports = {
    getAlldogs,
    getIfQuery,
    getIdraza
}