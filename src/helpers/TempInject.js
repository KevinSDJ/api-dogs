const axios =require('axios');
const {Temperament} =require('../db');
require('dotenv').config()


const {APPI_KEY}= process.env


// not solo 168 tienen la propiedad temperamento y hay algunos que no lo tienen
async function tempInject(){
    // 1r me traigo todas las razas
    // filtro un por uno si posee la propiedad temperamento
    // si tienen , en temperamento ,significa que tiene varios
    // chequeo que no haya espacios en los strings
    // lo pusheo
    // comparo si el siguiente elemento no es igual al elemento anteriormente pusheado si no lo es lo añado
    // y al final retorno la lista con todos los temperamentos encontrados
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APPI_KEY}`)
    .then( r=>{
       let temps = []
       r.data.map(e=>{
           if(e.hasOwnProperty("temperament")){
               if(e["temperament"].includes(",")){
                   if(e["temperament"].includes(" ")){
                    e["temperament"].split(" ").join("").split(",").map(j=>{
                        if(!temps.includes(j)){
                            temps.push(j)
                        }
                    })
                   }
                   if(!e["temperament"].includes(" ")){
                    e["temperament"].split(",").map(j=>{
                        if(!temps.includes(j)){
                            temps.push(j)
                        }
                    })
                   }
                   
               }
           }
       })
      temps.map((e,i)=> Temperament.create({name:e}))
   })
   
}


module.exports=tempInject