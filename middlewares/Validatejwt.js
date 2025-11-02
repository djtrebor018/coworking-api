import { request, response } from "express";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.js";

export const validateJWT = async (req=request , res=response, next) => {
    
 const token = req.header('token')

 if (!token) {
    return res.status(401).json({
        msg: 'no existe token para la peticion'
    })
 }

  try {
    const {uid}= jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findByPk(uid)

    if(!user){
         return res.status(401).json({
        msg: 'no existe token para la peticion'
    })
    }
     req.User = user;
     req.Uid = uid;
     next()

  } catch (error) {
    console.error(error)
        res.status(401).json({
            msg: 'token invalido'
         })
  }

}