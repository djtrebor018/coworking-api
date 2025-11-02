import {request,response} from 'express'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../middlewares/generatejwt.js'


export const login = async (req=request, res = response) => {
    const {Email , Password } = req.body
    try {

        const logUser = await User.findOne({where:{Email}})
        if(!logUser){
            return res.status(404).json({
                msg:'email no encontrado'
            })
        }
        const hashedPassword = await bcrypt.compare(Password,logUser.Password)
        if(!hashedPassword){
             return res.status(400).json({
                msg:' crendenciales invalidas'
             })
        }

        const token = await generateToken(logUser.ID_User)

        res.status(200).json({
            msg:'inicio de session correcto',
            token
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg:'error del servidor'
        })
    }
}

export const register = async (req=request, res = response) => {
    const {Name, Email, Password}= req.body

    try {
        const salt = await bcrypt.genSalt(8)   
        const hashedPassword = await bcrypt.hash(Password,salt) 
           
        const user = await User.create({
            Name,
            Email,
            Password:hashedPassword
        })
        res.status(201).json({
            msg:'usuario creado correctamente',
            user
        })
        
    } catch (error) {
         console.error(error)
        res.status(500).json({
            msg:'error del servidor'
        })
    }
}

export const logout = async (req=request, res = response) => {
    try {
        const token = req.header('token')
        if (!token) {
        return res.status(401).json({msg:'no existe token para hacer logout'})
        }

        res.status(200).json({
            msg:'cerrando session'
        })
    } catch (error) {
         console.error(error)
        res.status(500).json({
            msg:'error del servidor'
        })
    }
}