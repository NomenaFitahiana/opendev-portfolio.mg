#!/bin/bash
# Script d'initialisation de la base de données

echo "🗄️  Initialisation de la base de données..."

cd backend

# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate deploy

# Seed la base de données
npx prisma db seed

echo "✅ Base de données initialisée avec succès!"
