/** Types TypeScript pour l'admin */
export interface Project {
  id: string
  title: string
  clientName: string
  shortDescription: string
  // ... autres champs
}

export interface Technology {
  id: string
  name: string
  category: string
  logo?: string
}

export interface Testimonial {
  id: string
  clientName: string
  content: string
  // ... autres champs
}

export interface Contact {
  id: string
  name: string
  email: string
  message: string
  status: string
  createdAt: string
}
