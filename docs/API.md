# Documentation de l'API

## Authentification

### POST /api/auth/login
Connexion d'un utilisateur admin.

**Body:**
```json
{
  "email": "admin@opendev.mg",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "admin@opendev.mg",
    "name": "Admin"
  }
}
```

## Projets

### GET /api/projects
Récupère tous les projets (public).

**Query params:**
- `technology` (optionnel) : Filtrer par technologie
- `status` (optionnel) : Filtrer par statut

### GET /api/projects/:slug
Récupère un projet par son slug (public).

### POST /api/projects
Créer un nouveau projet (authentification requise).

### PUT /api/projects/:id
Modifier un projet (authentification requise).

### DELETE /api/projects/:id
Supprimer un projet (authentification requise).

## Technologies

### GET /api/technologies
Récupère toutes les technologies (public).

### POST /api/technologies
Créer une nouvelle technologie (authentification requise).

## Témoignages

### GET /api/testimonials
Récupère tous les témoignages actifs (public).

## Contacts

### POST /api/contacts
Soumettre un formulaire de contact (public, rate limited).

### GET /api/contacts
Récupérer toutes les demandes (authentification requise).
