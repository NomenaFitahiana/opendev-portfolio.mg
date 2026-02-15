/**
 * Routes d'authentification
 */

import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { authLimiter } from '../middlewares/rateLimiter.middleware'

const router = Router()

// POST /api/auth/login
router.post('/login', authLimiter, authController.login)

// POST /api/auth/register (optionnel)
router.post('/register', authController.register)

// GET /api/auth/me (protégée)
router.get('/me', authMiddleware, authController.getProfile)

export default router
