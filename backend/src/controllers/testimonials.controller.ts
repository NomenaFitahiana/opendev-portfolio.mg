/**
 * Controller des témoignages
 * CRUD pour la gestion des témoignages clients
 */

import { Request, Response } from 'express'
import * as testimonialsService from '../services/testimonials.service'

// GET /api/testimonials - Liste tous les témoignages actifs
export async function getAllTestimonials(req: Request, res: Response) {
  // Implémenter
}

// POST /api/testimonials - Créer un témoignage (admin only)
export async function createTestimonial(req: Request, res: Response) {
  // Implémenter
}

// PUT /api/testimonials/:id - Modifier un témoignage (admin only)
export async function updateTestimonial(req: Request, res: Response) {
  // Implémenter
}

// DELETE /api/testimonials/:id - Supprimer un témoignage (admin only)
export async function deleteTestimonial(req: Request, res: Response) {
  // Implémenter
}
