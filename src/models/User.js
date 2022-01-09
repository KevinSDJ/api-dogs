const {DataTypes} =require("sequelize");


module.exports= (sequelize)=>{
    sequelize.define('user',{
        id:{
            primaryKey:true,
            allowNull:false,
            autoIncrement: true,
            type:DataTypes.INTEGER
        },
        username:{
            allowNull:false,
            type:DataTypes.STRING(50)
        },
        email:{
            allowNull:false,
            type:DataTypes.STRING(400)
        },
        password:{
            allowNull:false,
            type:DataTypes.STRING(400)
        }
    },{timestamps:false})
}