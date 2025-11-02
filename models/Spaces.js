import { DataTypes } from "sequelize";
import { DB } from "../config/DB.js";


export const Space = DB.define('Spaces',{
    ID_Space:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Spaces_Name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Spaces_Types:{
        type:DataTypes.ENUM('Escritorio_Individual','Sala_de_reuniones_pequeña','Sala_de_reuniones_grande','cabina_privada'),
        allowNull:false
    },
     Capacity:{
        type:DataTypes.INTEGER,
       
    },
    Price_per_hour:{
        type:DataTypes.DECIMAL(10,2),
            
    },
    Location:{
        type:DataTypes.INTEGER,
        
    },
    Premiun:{
        type:DataTypes.BOOLEAN,
        
    }
},{timestamps:false})