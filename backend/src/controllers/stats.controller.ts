/**
 * Controller des statistiques
 * Gestion des stats du collectif (nb devs, projets, clients)
 */

import { Request, Response } from 'express'
import * as statsService from '../services/stats.service'

// GET /api/stats - Récupérer toutes les statistiques
export async function getStats(req: Request, res: Response) {
  try {
    // Appeler statsService.getAll()
    // Retourner les stats
  } catch (error) {
    // Gérer l'erreur
  }
}

// PUT /api/stats - Mettre à jour les statistiques (admin only)
export async function updateStats(req: Request, res: Response) {
  try {
    // Appeler statsService.update()
    // Retourner les stats mises à jour
  } catch (error) {
    // Gérer l'erreur
  }
}
