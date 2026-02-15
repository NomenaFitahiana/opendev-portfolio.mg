/**
 * Service des statistiques
 * Gestion des stats du collectif
 */

import prisma from '../config/database'

// Récupérer toutes les statistiques
export async function getAll() {
  // Récupérer depuis la table Settings
  // Retourner un objet avec nb_developers, nb_projects, nb_clients
}

// Mettre à jour les statistiques
export async function update(data: any) {
  // Mettre à jour les Settings
  // Retourner les nouvelles valeurs
}
