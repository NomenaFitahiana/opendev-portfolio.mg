/**
 * Routes des contacts
 */

import { Router } from 'express'
import * as contactsController from '../controllers/contacts.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { contactLimiter } from '../middlewares/rateLimiter.middleware'

const router = Router()

// Route publique (avec rate limiting)
router.post('/', contactLimiter, contactsController.createContact)

// Routes protégées (admin only)
router.get('/', authMiddleware, contactsController.getAllContacts)
router.patch('/:id/status', authMiddleware, contactsController.updateContactStatus)
router.delete('/:id', authMiddleware, contactsController.deleteContact)

export default router
