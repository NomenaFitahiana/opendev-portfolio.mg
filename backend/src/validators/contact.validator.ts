/** Validateurs pour les contacts */
import { body } from 'express-validator'

export const createContactValidator = [
  body('name').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('message').notEmpty().withMessage('Le message est requis'),
]
