/** Validateurs pour les témoignages */
import { body } from 'express-validator'

export const createTestimonialValidator = [
  body('clientName').notEmpty(),
  body('clientRole').notEmpty(),
  body('company').notEmpty(),
  body('content').notEmpty(),
]
