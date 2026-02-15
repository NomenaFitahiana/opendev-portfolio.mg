/**
 * Formulaire de création/édition d'un projet
 * Tous les champs du cahier des charges
 */

import { useForm } from 'react-hook-form'

export default function ProjectForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <div className="project-form">
      <h1>Créer un projet</h1>
      
      <form>
        {/* Champs du formulaire : */}
        {/* - Titre */}
        {/* - Nom du client + option masquer */}
        {/* - Description courte (200 caractères) */}
        {/* - Description détaillée (éditeur riche) */}
        {/* - Problématique / Solution */}
        {/* - Upload d'images (multiple) */}
        {/* - Sélection de technologies (tags) */}
        {/* - Durée (nombre) */}
        {/* - Taille d'équipe (nombre) */}
        {/* - Budget (optionnel) */}
        {/* - Résultats / KPIs */}
        {/* - Statut (select) */}
        {/* - Ordre d'affichage */}
        
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  )
}
