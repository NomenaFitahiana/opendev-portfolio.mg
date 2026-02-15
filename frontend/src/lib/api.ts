/**
 * Fonctions d'appel à l'API backend
 * Centralisation de toutes les requêtes HTTP
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

// Récupérer tous les projets
export async function getProjects(filters?: any) {
  // Implémenter l'appel GET /api/projects
}

// Récupérer un projet par slug
export async function getProjectBySlug(slug: string) {
  // Implémenter l'appel GET /api/projects/:slug
}

// Récupérer toutes les technologies
export async function getTechnologies() {
  // Implémenter l'appel GET /api/technologies
}

// Récupérer tous les témoignages
export async function getTestimonials() {
  // Implémenter l'appel GET /api/testimonials
}

// Envoyer une demande de contact
export async function sendContactForm(data: any) {
  // Implémenter l'appel POST /api/contacts
}

// Récupérer les statistiques
export async function getStats() {
  // Implémenter l'appel GET /api/stats
}
