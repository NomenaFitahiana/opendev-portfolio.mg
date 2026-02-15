/**
 * Service des témoignages
 * Logique métier pour la gestion des témoignages
 */

import prisma from '../config/database'

export async function getAll() {
  // Récupérer seulement les témoignages actifs
}

export async function create(data: any) {
  // Créer le témoignage
}

export async function update(id: string, data: any) {
  // Mettre à jour
}

export async function deleteById(id: string) {
  // Supprimer
}
