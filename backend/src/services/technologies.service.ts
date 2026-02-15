/**
 * Service des technologies
 * Logique métier pour la gestion des technologies
 */

import prisma from '../config/database'

// Récupérer toutes les technologies
export async function getAll() {
  // Requête Prisma
  // Grouper par catégorie si nécessaire
}

// Créer une nouvelle technologie
export async function create(data: any) {
  // Créer en BDD
}

// Modifier une technologie
export async function update(id: string, data: any) {
  // Mettre à jour
}

// Supprimer une technologie
export async function deleteById(id: string) {
  // Vérifier qu'elle n'est pas utilisée dans des projets
  // Supprimer
}
