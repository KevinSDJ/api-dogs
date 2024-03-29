require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_DATABASE
} = process.env;
// data base heroku psql -h ec2-52-207-163-202.compute-1.amazonaws.com db8i8nkjl8pbdl isjlarsxyikztx 

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  logging: false, 
  native: false, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Dog,Temperament} = sequelize.models;


Dog.belongsToMany(Temperament,{through:"dogs_temperaments"})
Temperament.belongsToMany(Dog,{through:"dogs_temperaments"})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
