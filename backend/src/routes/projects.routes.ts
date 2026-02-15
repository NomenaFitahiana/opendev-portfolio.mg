/**
 * Routes des projets
 */

import { Router } from 'express'
import * as projectsController from '../controllers/projects.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

// Routes publiques
router.get('/', projectsController.getAllProjects)
router.get('/:slug', projectsController.getProjectBySlug)

// Routes protégées (admin only)
router.post('/', authMiddleware, projectsController.createProject)
router.put('/:id', authMiddleware, projectsController.updateProject)
router.delete('/:id', authMiddleware, projectsController.deleteProject)

export default router
