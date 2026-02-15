/**
 * Centralisation de toutes les routes de l'API
 */

import { Router } from 'express'
import authRoutes from './auth.routes'
import projectsRoutes from './projects.routes'
import technologiesRoutes from './technologies.routes'
import testimonialsRoutes from './testimonials.routes'
import contactsRoutes from './contacts.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/projects', projectsRoutes)
router.use('/technologies', technologiesRoutes)
router.use('/testimonials', testimonialsRoutes)
router.use('/contacts', contactsRoutes)

export default router
