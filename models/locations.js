import { DataTypes } from "sequelize";
import { DB } from "../config/DB.js";


export const Locations = DB.define('Location',{
    ID_Location:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Location_Name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Location_Adress:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Location_City:{
        type:DataTypes.STRING,
        allowNull:false,        
    },

},{
    tableName: 'Location', timestamps:false})