/**
 * Middleware de gestion des erreurs
 * Catch-all pour toutes les erreurs non gérées
 */

import { Request, Response, NextFunction } from 'express'

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Erreur:', error)
  
  const status = error.status || 500
  const message = error.message || 'Erreur serveur interne'
  
  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  })
}
