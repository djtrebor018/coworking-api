import express from'express'
import cors from 'cors' 
import { authRouter } from '../routes/auth.routes.js';
import { DB } from '../config/DB.js';
import { spacesRouter } from '../routes/spaces.routes.js';
import { bookingRouter } from '../routes/bookeing.routes.js';
import { AdminRouter } from '../routes/Admin.routes.js';


export class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            spaces: '/api/spaces',
            booking: '/api/bookings',
            admin: '/api/admin',
        }
    }

    async init(){
        await this.conection()
        this.Middleware(),
        this.routes(),
        this.listen()
     }

       async conection(){
        try {
            await DB.authenticate()
            console.log('database online')
        } catch (error) {
            console.error(error)
            console.log('error');
            
        }
       }

    Middleware(){
        this.app.use(express.json())
        this.app.use(cors())
    }
    routes(){
         this.app.use(this.paths.auth,authRouter)
         this.app.use(this.paths.spaces,spacesRouter)
         this.app.use(this.paths.booking,bookingRouter)
         this.app.use(this.paths.admin,AdminRouter)
    }   

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`server running on port:${this.port}`);
            
        })
    }
    
}