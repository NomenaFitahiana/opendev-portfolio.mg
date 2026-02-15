# Guide Développeur

## Architecture

Le projet suit une architecture client-serveur avec trois applications distinctes :

1. **Frontend** (Next.js) - Site public
2. **Backend** (Node.js + Express) - API REST
3. **Admin** (React + Vite) - Panel d'administration

## Structure de la Base de Données

Voir le fichier `backend/prisma/schema.prisma` pour le schéma complet.

### Modèles principaux :
- **User** : Utilisateurs admin
- **Project** : Projets du portfolio
- **Technology** : Technologies maîtrisées
- **Testimonial** : Témoignages clients
- **Contact** : Demandes de contact

## Commandes Utiles

### Backend
```bash
npm run dev          # Lancer en mode développement
npm run build        # Compiler TypeScript
npm start            # Lancer en production
npx prisma studio    # Interface visuelle BDD
npx prisma migrate dev # Créer une migration
```

### Frontend
```bash
npm run dev          # Lancer le serveur de dev
npm run build        # Build pour production
npm run lint         # Vérifier le code
```

### Admin
```bash
npm run dev          # Lancer Vite dev server
npm run build        # Build pour production
```

## Ajouter une Nouvelle Fonctionnalité

1. Définir le modèle dans `prisma/schema.prisma`
2. Créer une migration : `npx prisma migrate dev`
3. Créer le service dans `backend/src/services/`
4. Créer le controller dans `backend/src/controllers/`
5. Créer la route dans `backend/src/routes/`
6. Créer l'interface admin si nécessaire

## Tests

Écrire des tests dans le dossier `backend/tests/` avec Jest.

```bash
npm test
```
