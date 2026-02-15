# Guide de Déploiement

## Prérequis
- Node.js 18+
- PostgreSQL 14+
- Compte Cloudinary
- Serveur SMTP pour emails

## Déploiement Backend

1. Installer les dépendances
```bash
cd backend
npm install
```

2. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

3. Initialiser la base de données
```bash
npx prisma migrate deploy
npx prisma db seed
```

4. Build et démarrer
```bash
npm run build
npm start
```

## Déploiement Frontend

1. Installer les dépendances
```bash
cd frontend
npm install
```

2. Configurer les variables d'environnement
```bash
cp .env.local.example .env.local
# Éditer avec l'URL de votre API
```

3. Build pour production
```bash
npm run build
```

4. Déployer sur Vercel
```bash
vercel deploy
```

## Déploiement Admin

1. Installer les dépendances
```bash
cd admin
npm install
```

2. Build pour production
```bash
npm run build
```

3. Servir les fichiers statiques
```bash
npm run preview
```

## Recommandations d'hébergement

- **Backend:** Railway, Render, DigitalOcean
- **Frontend:** Vercel, Netlify
- **Base de données:** Railway, Supabase, Neon
- **Images:** Cloudinary
