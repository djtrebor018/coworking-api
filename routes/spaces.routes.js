import { Router } from "express";
import { checkAvailability, spaceFilter, spacesById } from "../controllers/space.controller.js";
import { validateJWT } from "../middlewares/Validatejwt.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/fields_validator.js";
import { existeSpace } from "../helpers/Db-validators.js";
import { validateSpaceFilter } from "../helpers/filterValidators.js";
import { validateCheckAvailability } from "../helpers/Availability.js";

export const spacesRouter =Router()

spacesRouter.get('/',validateJWT,validateSpaceFilter,validateFields,spaceFilter)

spacesRouter.get('/availability',[validateJWT,validateCheckAvailability,validateFields],checkAvailability)

spacesRouter.get('/:id',validateJWT,[
  check('id').notEmpty().withMessage('debe ingresar el id para buscar el usuario')
  .isInt().withMessage('el id debe ser un numero entero')
  .custom(existeSpace),
validateFields],spacesById)
