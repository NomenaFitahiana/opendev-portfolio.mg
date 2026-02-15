/**
 * Controller d'authentification
 * Gère la connexion, inscription et refresh token
 */

import { Request, Response } from 'express'
import * as authService from '../services/auth.service'

// POST /api/auth/login
export async function login(req: Request, res: Response) {
  try {
    // Appeler authService.login()
    // Retourner le token JWT
  } catch (error) {
    // Gérer l'erreur
  }
}

// POST /api/auth/register (optionnel pour créer des admins)
export async function register(req: Request, res: Response) {
  try {
    // Appeler authService.register()
    // Retourner le nouvel utilisateur
  } catch (error) {
    // Gérer l'erreur
  }
}

// GET /api/auth/me
export async function getProfile(req: Request, res: Response) {
  try {
    // Retourner le profil de l'utilisateur connecté
  } catch (error) {
    // Gérer l'erreur
  }
}
