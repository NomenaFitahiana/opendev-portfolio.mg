/** Validateurs pour les projets */
import { body } from 'express-validator'

export const createProjectValidator = [
  body('title').notEmpty().withMessage('Le titre est requis'),
  body('clientName').notEmpty().withMessage('Le nom du client est requis'),
  body('shortDescription').notEmpty().isLength({ max: 200 }),
  // ... autres validations
]
