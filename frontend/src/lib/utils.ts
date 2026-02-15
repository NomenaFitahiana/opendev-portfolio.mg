/**
 * Fonctions utilitaires générales
 * Helpers pour formatage, validation, etc.
 */

// Formater une date
export function formatDate(date: string | Date): string {
  // Implémenter le formatage de date
  return ''
}

// Générer un slug à partir d'un titre
export function slugify(text: string): string {
  // Implémenter la génération de slug
  return text.toLowerCase().replace(/\s+/g, '-')
}

// Tronquer un texte
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Combiner des classes CSS (utile avec Tailwind)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
