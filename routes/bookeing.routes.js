import { Router } from "express";
import { bookingById, cancelBooking, createBooking, logUser_booking } from "../controllers/booking.controller.js";
import { validateJWT } from "../middlewares/Validatejwt.js";
import { bookingCount, existeSpace, validateBooking, validateDate, validateNoOverlap } from "../helpers/Db-validators.js";
import { validateFields } from "../middlewares/fields_validator.js";
import { check } from "express-validator";

 export const bookingRouter = Router();


 bookingRouter.post('/',validateJWT,[
        check('ID_Space').notEmpty().withMessage('debe ingresar el espacio que desea reservar').bail()
        .isInt().withMessage('este campo debe ser un numero entero').bail()
        .custom(existeSpace).bail(),

       check('Startat')
    .notEmpty().withMessage('Debe ingresar una hora de inicio para buscar el espacio').bail()
    .isISO8601().withMessage('Formato inválido. Use ISO 8601: YYYY-MM-DDTHH:mm:ss (ej: 2025-10-30T09:00:00)').bail()
     ,

  check('EndAt')
  .notEmpty().withMessage('Debe ingresar una hora de fin para buscar el espacio').bail()
  .isISO8601().withMessage('Formato inválido. Use ISO 8601: YYYY-MM-DDTHH:mm:ss (ej: 2025-10-30T11:00:00)').bail()
  .custom(validateDate),

       validateNoOverlap,validateBooking,bookingCount ,validateFields
 ],createBooking)

bookingRouter.get('/',validateJWT,logUser_booking)

bookingRouter.get('/:id',validateJWT,[
    check('id').notEmpty().withMessage('debe ingresar el id para buscar el usuario').bail()
  .isInt({min:0}).withMessage('el id debe ser un numero entero y mayor que 0').bail(),
  validateFields],bookingById)

bookingRouter.patch('/:id/cancel',validateJWT,[
    check('id').notEmpty().withMessage('debe ingresar el id para buscar el usuario').bail()
  .isInt({min: 0}).withMessage('el id debe ser un numero entero y mayor que 0').bail(),
validateFields],cancelBooking)