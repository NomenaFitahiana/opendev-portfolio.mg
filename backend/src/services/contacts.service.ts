/**
 * Service des contacts
 * Logique métier pour les demandes de contact
 */

import prisma from '../config/database'
import { sendEmail } from './email.service'

export async function getAll() {
  // Récupérer tous les contacts
  // Trier par date (plus récents en premier)
}

export async function create(data: any) {
  // Créer le contact en BDD
  // Envoyer un email de confirmation au client
  // Envoyer une notification aux admins
  // Retourner le contact créé
}

export async function updateStatus(id: string, status: string) {
  // Mettre à jour le statut (UNREAD, READ, ARCHIVED)
}

export async function deleteById(id: string) {
  // Supprimer le contact
}
