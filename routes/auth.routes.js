import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/fields_validator.js";
import { validateJWT } from "../middlewares/Validatejwt.js";
import { validateEmail } from "../helpers/Db-validators.js";

 export const authRouter = Router();


 authRouter.post('/login',[
    check('Email')
    .trim()
    .notEmpty().withMessage('debe ingresar un correo para iniciar session').bail()
    .isEmail().withMessage('debe ser un Email valido').bail(),

    check('Password')
    .trim()
    .notEmpty().withMessage('debe ingresar un password para iniciar session').bail()
    .isString().withMessage('el password debe ser un string'),
    validateFields
    
 ],login)
 authRouter.post('/register',[
      check('Name')
      .trim()
      .notEmpty().withMessage('debe ingresar un nombre para registrarser').bail()
      .isString().withMessage('el campo Name debe ser un string').bail()
      .custom(validateEmail),
      
     check('Email')
     .trim()
     .notEmpty().withMessage('debe ingresar un correo para registrarse').bail()
    .isEmail().withMessage('debe ser un Email valido').bail(),
    
    check('Password')
    .trim()
    .notEmpty().withMessage('debe ingresar un password para registrarse').bail()
    .isString().withMessage('el password debe ser un string')
    .isLength({min: 6}).withMessage('el password debe terner minimo 6 caractertes').bail(),
    validateFields
 ],register)
 
 authRouter.post('/logout',validateJWT ,logout)