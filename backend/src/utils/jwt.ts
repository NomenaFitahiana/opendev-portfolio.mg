/** Utilitaires JWT */
import jwt from 'jsonwebtoken'
import { config } from '../config/environment'

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.jwtSecret)
}
