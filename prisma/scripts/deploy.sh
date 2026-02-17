#!/bin/bash
# Script de déploiement automatique

echo "🚀 Déploiement en cours..."

# Backend
echo "📦 Build du backend..."
cd backend
npm run build

# Frontend
echo "📦 Build du frontend..."
cd ../frontend
npm run build

# Admin
echo "📦 Build de l'admin..."
cd ../admin
npm run build

echo "✅ Déploiement terminé!"
