const {Temperament}= require('../db');

const getTemps=async (rq,rs)=>{
    try{
        let tmps= await Temperament.findAll()
        return rs.json(tmps)
    }catch(e){
        rs.json({error:e})
    }
}

module.exports={getTemps}