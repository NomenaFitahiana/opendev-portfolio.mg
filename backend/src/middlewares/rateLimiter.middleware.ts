/**
 * Middleware de rate limiting
 * Limite le nombre de requêtes pour éviter le spam
 */

import rateLimit from 'express-rate-limit'

// Rate limiter pour les formulaires de contact (max 5 par heure)
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5,
  message: 'Trop de demandes, veuillez réessayer plus tard',
})

// Rate limiter pour l'authentification (max 5 tentatives par 15 min)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Trop de tentatives de connexion, veuillez réessayer plus tard',
})
