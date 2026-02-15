/**
 * Routes des témoignages
 */

import { Router } from 'express'
import * as testimonialsController from '../controllers/testimonials.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

// Route publique
router.get('/', testimonialsController.getAllTestimonials)

// Routes protégées (admin only)
router.post('/', authMiddleware, testimonialsController.createTestimonial)
router.put('/:id', authMiddleware, testimonialsController.updateTestimonial)
router.delete('/:id', authMiddleware, testimonialsController.deleteTestimonial)

export default router
