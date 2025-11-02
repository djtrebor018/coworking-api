import { query } from 'express-validator';

export const validateCheckAvailability = [
  
  query('start')
    .exists().withMessage('El parámetro start es obligatorio')
    .notEmpty().withMessage('start no puede estar vacío')
    .isISO8601().withMessage('start debe ser una fecha válida (ISO 8601)')
    .bail(),

  
  query('end')
    .exists().withMessage('El parámetro end es obligatorio')
    .notEmpty().withMessage('end no puede estar vacío')
    .isISO8601().withMessage('end debe ser una fecha válida (ISO 8601)')
    .bail(),

  
  query('spaceId')
    .optional()
    .isInt({ min: 1 }).withMessage('spaceId debe ser un número entero mayor que 0')
    .toInt() // conversion automática a número
];
