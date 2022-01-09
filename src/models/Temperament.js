const {DataTypes}=require("sequelize");


module.exports=(sequelize)=>{
    sequelize.define('temperament',{
        id:{
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            type:DataTypes.INTEGER
        },
        name:{
            allowNull:false,
            type:DataTypes.STRING(100)
        }
    },{timestamps:false})
}