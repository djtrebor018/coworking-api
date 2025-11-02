import { request, response,  } from "express";

export const AdminRol =(req = request,res=response, next)=>{
 
    if(!req.User){
           return res.status(400).json({
            msg:' debe validar el token antes de validar el rol  '
           })
    }

    const {Name ,Rol } = req.User;

    if ( Rol !=='Admin') {
        return res.status(403).json({
            msg:`el usuario: ${Name}  no tiene autorizacion para realizar esta accion `
           })
    }
 next()

}