/**
 * Configuration et initialisation de Prisma Client
 * Instance unique réutilisée dans toute l'application
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
