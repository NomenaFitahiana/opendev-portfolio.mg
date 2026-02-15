/**
 * Script de seed pour peupler la base de données
 * Données initiales : admin, quelques projets de démo, technologies
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Créer un utilisateur admin
  // Créer des technologies de base
  // Créer quelques projets de démonstration
  // Créer des témoignages de test
  
  console.log('Seed terminé !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
