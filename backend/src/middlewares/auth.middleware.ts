/**
 * Middleware d'authentification
 * Vérifie le token JWT pour les routes protégées
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/environment'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Récupérer le token depuis le header Authorization
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' })
    }
    
    // Vérifier le token
    const decoded = jwt.verify(token, config.jwtSecret)
    
    // Ajouter les infos utilisateur à req
    // @ts-ignore
    req.user = decoded
    
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide' })
  }
}
