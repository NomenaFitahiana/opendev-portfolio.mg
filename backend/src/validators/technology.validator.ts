/** Validateurs pour les technologies */
import { body } from 'express-validator'

export const createTechnologyValidator = [
  body('name').notEmpty().withMessage('Le nom est requis'),
  body('category').isIn(['FRONTEND', 'BACKEND', 'MOBILE', 'DATABASE', 'DEVOPS', 'DESIGN', 'OTHER']),
]
