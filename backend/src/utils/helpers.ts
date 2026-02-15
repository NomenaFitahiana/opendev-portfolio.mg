/** Fonctions utilitaires générales */

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function formatDuration(days: number): string {
  if (days < 7) return `${days} jours`
  if (days < 30) return `${Math.floor(days / 7)} semaines`
  return `${Math.floor(days / 30)} mois`
}
