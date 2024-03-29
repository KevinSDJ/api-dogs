const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      allowNull:false,
      primaryKey:true,
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type:DataTypes.STRING,
      allowNull:false
    },
    weight:{
      type:DataTypes.STRING,
      allowNull:false
    },
    age:{
      type:DataTypes.STRING,
      allowNull:true
    },
    image:{
      type:DataTypes.TEXT,
      allowNull:false
    }
  },{timestamps:false});
};
