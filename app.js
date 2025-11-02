import { Server } from "./models/server.js";
import  dotenv  from "dotenv";
import './models/relations.js'

dotenv.config()
 
const server = new Server()

server.init()
console.log("Server local time:", new Date().toString());


