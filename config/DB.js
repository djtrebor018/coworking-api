import { Sequelize } from "sequelize";
import  dotenv  from "dotenv";

dotenv.config()

export const DB = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{      
        host: process.env.HOST,
        dialect:'mysql',
        timezone: "-04:00", 
        dialectOptions: {
         useUTC: false,
    },
    }
)
   
     