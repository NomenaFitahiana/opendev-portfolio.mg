/**
 * Types TypeScript pour les projets
 */

export interface Project {
  id: string
  slug: string
  title: string
  clientName: string
  hideClientName: boolean
  shortDescription: string
  longDescription: string
  problem?: string
  solution?: string
  images: ProjectImage[]
  technologies: Technology[]
  duration: number // en jours
  teamSize: number
  budget?: number
  metrics?: string
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FEATURED'
  featured: boolean
  order: number
  testimonial?: Testimonial
  createdAt: string
  updatedAt: string
}

export interface ProjectImage {
  id: string
  url: string
  alt?: string
  order: number
}
