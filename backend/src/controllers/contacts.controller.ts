/**
 * Controller des demandes de contact
 * Gestion des messages du formulaire de contact
 */

import { Request, Response } from 'express'
import * as contactsService from '../services/contacts.service'

// GET /api/contacts - Liste tous les contacts (admin only)
export async function getAllContacts(req: Request, res: Response) {
  // Implémenter
}

// POST /api/contacts - Soumettre un formulaire de contact (public)
export async function createContact(req: Request, res: Response) {
  try {
    // Valider les données
    // Appeler contactsService.create()
    // Envoyer email de confirmation
    // Retourner confirmation
  } catch (error) {
    // Gérer l'erreur
  }
}

// PATCH /api/contacts/:id/status - Changer le statut (admin only)
export async function updateContactStatus(req: Request, res: Response) {
  // Implémenter (UNREAD -> READ -> ARCHIVED)
}

// DELETE /api/contacts/:id - Supprimer un contact (admin only)
export async function deleteContact(req: Request, res: Response) {
  // Implémenter
}
