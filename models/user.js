import { DataTypes } from "sequelize";
import { DB } from "../config/DB.js";


export const User = DB.define('Users',{
    ID_User:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false,        
    },
    Membership:{
        type:DataTypes.ENUM('Basic','Premiun','Enterprise'),
        defaultValue: 'Basic',
    },
    Rol:{
        type:DataTypes.ENUM('User','Admin'),
        defaultValue:'User'
    }
},{timestamps:false})

