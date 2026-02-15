/**
 * Controller des projets
 * CRUD complet pour les projets du portfolio
 */

import { Request, Response } from 'express'
import * as projectsService from '../services/projects.service'

// GET /api/projects - Liste tous les projets (avec filtres)
export async function getAllProjects(req: Request, res: Response) {
  try {
    // Récupérer les filtres depuis query params
    // Appeler projectsService.getAll()
    // Retourner la liste des projets
  } catch (error) {
    // Gérer l'erreur
  }
}

// GET /api/projects/:slug - Détail d'un projet
export async function getProjectBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params
    // Appeler projectsService.getBySlug()
    // Retourner le projet
  } catch (error) {
    // Gérer l'erreur
  }
}

// POST /api/projects - Créer un projet (admin only)
export async function createProject(req: Request, res: Response) {
  try {
    // Appeler projectsService.create()
    // Retourner le projet créé
  } catch (error) {
    // Gérer l'erreur
  }
}

// PUT /api/projects/:id - Modifier un projet (admin only)
export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    // Appeler projectsService.update()
    // Retourner le projet modifié
  } catch (error) {
    // Gérer l'erreur
  }
}

// DELETE /api/projects/:id - Supprimer un projet (admin only)
export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    // Appeler projectsService.delete()
    // Retourner confirmation
  } catch (error) {
    // Gérer l'erreur
  }
}
