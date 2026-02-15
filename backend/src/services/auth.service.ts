/**
 * Service d'authentification
 * Logique métier pour login, register, tokens JWT
 */

import prisma from '../config/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config/environment'

// Connexion d'un utilisateur
export async function login(email: string, password: string) {
  // Rechercher l'utilisateur
  // Vérifier le mot de passe avec bcrypt
  // Générer un token JWT
  // Retourner le token et les infos utilisateur
}

// Inscription d'un nouvel admin
export async function register(email: string, password: string, name: string) {
  // Hasher le mot de passe
  // Créer l'utilisateur en BDD
  // Retourner l'utilisateur créé (sans le password)
}

// Vérifier un token JWT
export async function verifyToken(token: string) {
  // Vérifier et décoder le token
  // Retourner les données du token
}
