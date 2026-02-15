/**
 * Routes des technologies
 */

import { Router } from 'express'
import * as technologiesController from '../controllers/technologies.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

// Route publique
router.get('/', technologiesController.getAllTechnologies)

// Routes protégées (admin only)
router.post('/', authMiddleware, technologiesController.createTechnology)
router.put('/:id', authMiddleware, technologiesController.updateTechnology)
router.delete('/:id', authMiddleware, technologiesController.deleteTechnology)

export default router
