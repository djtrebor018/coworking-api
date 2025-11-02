import { Router } from "express";
import { validateJWT } from "../middlewares/Validatejwt.js";
import { AdminRol } from "../middlewares/adminRol.js";
import { gellAllbooks, UdpteSpace } from "../controllers/admin.controller.js";
import { validateFields } from "../middlewares/fields_validator.js";
import { check, checkExact } from "express-validator";
import { existeSpace, existLocation } from "../helpers/Db-validators.js";

export const AdminRouter = Router()


AdminRouter.get('/bookings',[validateJWT,AdminRol],gellAllbooks)

AdminRouter.put('/spaces/:id',[validateJWT,AdminRol,
    check('id').notEmpty().withMessage('debe ingresar el id para buscar el usuario').bail()
    .isInt().withMessage('el id debe ser un numero entero').bail()
    .custom(existeSpace).bail(),
     
    check('Spaces_Name').optional()
    .trim()
    .notEmpty().withMessage('si va a enviar este campo no puede ser vacio').bail()
    .isString().withMessage('este campo debe ser un string').bail(),
    
    check('Spaces_Types').optional()
    .trim()
    .notEmpty().withMessage('si va a enviar este campo no puede ser vacio').bail()
      .isString().withMessage('este campo debe ser un string').bail()
      .isIn(['Escritorio_Individual','Sala_de_reuniones_pequeña','Sala_de_reuniones_grande','cabina_privada']).bail()
      .withMessage('ese tipo de espacion no esta registrado').bail(),

      check('Capacity').optional()
      .isInt().withMessage('este campo debe ser unn numero entero').bail()
      .isLength({min:1}).withMessage('la capacidad minima permitida es 1'),

      check('Price_per_hour').optional()
      .isDecimal().withMessage('El valor ingresado debe ser un número decimal (ej. 10.50)').bail(),
      
      check('Location').optional()
      .isInt().withMessage('este campo debe ser unn numero entero').bail()
      .custom(existLocation).bail(),
    
      check('Premiun').optional({checkFalsy:true})
      .isBoolean().withMessage('el valor de este campo debe ser un numero entero').bail(),
      
    
    validateFields],UdpteSpace)