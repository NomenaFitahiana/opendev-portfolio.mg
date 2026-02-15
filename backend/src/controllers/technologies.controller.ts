/**
 * Controller des technologies
 * CRUD pour la gestion des technologies
 */

import { Request, Response } from 'express'
import * as technologiesService from '../services/technologies.service'

// GET /api/technologies - Liste toutes les technologies
export async function getAllTechnologies(req: Request, res: Response) {
  // Implémenter
}

// POST /api/technologies - Créer une technologie (admin only)
export async function createTechnology(req: Request, res: Response) {
  // Implémenter
}

// PUT /api/technologies/:id - Modifier une technologie (admin only)
export async function updateTechnology(req: Request, res: Response) {
  // Implémenter
}

// DELETE /api/technologies/:id - Supprimer une technologie (admin only)
export async function deleteTechnology(req: Request, res: Response) {
  // Implémenter
}
