/**
 * Service des projets
 * Logique métier pour la gestion des projets
 */

import prisma from '../config/database'

// Récupérer tous les projets avec filtres
export async function getAll(filters?: any) {
  // Construire la requête Prisma avec filtres
  // Inclure les relations (technologies, images, testimonial)
  // Retourner les projets
}

// Récupérer un projet par slug
export async function getBySlug(slug: string) {
  // Requête Prisma avec toutes les relations
  // Retourner le projet ou null
}

// Créer un nouveau projet
export async function create(data: any) {
  // Générer le slug depuis le titre
  // Créer le projet en BDD
  // Retourner le projet créé
}

// Modifier un projet existant
export async function update(id: string, data: any) {
  // Mettre à jour le projet
  // Gérer les relations (technologies, images)
  // Retourner le projet modifié
}

// Supprimer un projet
export async function deleteById(id: string) {
  // Supprimer le projet (cascade sur images)
  // Retourner confirmation
}
