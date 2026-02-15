/**
 * Middleware de validation des données
 * Utilise express-validator pour valider les entrées
 */

import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Erreurs de validation',
      errors: errors.array() 
    })
  }
  
  next()
}
