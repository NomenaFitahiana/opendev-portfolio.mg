# OpenDev Portfolio

Portfolio professionnel pour OpenDev Madagascar - Plateforme de mise en valeur des projets et du collectif de développeurs.

##  Structure du Projet

- **frontend/** - Site public Next.js (vitrine portfolio)
- **backend/** - API Node.js + Express + Prisma
- **admin/** - Panel d'administration React
- **shared/** - Types et constantes partagés
- **docs/** - Documentation technique et guides
- **scripts/** - Scripts utilitaires

##  Installation

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin
```bash
cd admin
npm install
npm run dev
```

##  Documentation

Voir le dossier `docs/` pour la documentation complète :
- `API.md` - Documentation de l'API
- `DEPLOYMENT.md` - Guide de déploiement
- `USER_GUIDE.md` - Guide utilisateur admin
- `DEVELOPER_GUIDE.md` - Guide développeur

##  Technologies

- **Frontend:** Next.js 14+, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Admin:** React, Vite, TypeScript
