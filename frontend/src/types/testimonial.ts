/**
 * Types TypeScript pour les témoignages
 */

export interface Testimonial {
  id: string
  clientName: string
  clientRole: string
  company: string
  content: string
  photo?: string
  projectId?: string
  active: boolean
  createdAt: string
  updatedAt: string
}
