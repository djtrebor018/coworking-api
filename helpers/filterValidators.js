import { query } from 'express-validator';
import { existLocation } from './Db-validators.js';

export const validateSpaceFilter = [

  query('location')
    .optional()
    .isInt({ min: 1 }).withMessage('location debe ser un número entero mayor que 0')
    .custom(existLocation),

  query('type')
    .optional()
    .trim()
    .isString().withMessage('type debe ser un string')
    .isIn([
      'Escritorio_Individual',
      'Sala_de_reuniones_pequeña',
      'Sala_de_reuniones_grande',
      'cabina_privada'
    ]).withMessage('type no es válido'),

  query('capacity')
    .optional()
    .isInt({ min: 1 }).withMessage('capacity debe ser un número entero mayor que 0'),

  query('Spaces_Name')
    .optional()
    .trim()
    .notEmpty().withMessage('Spaces_Name no puede ser vacío')
    .isString().withMessage('Spaces_Name debe ser un string'),
];
