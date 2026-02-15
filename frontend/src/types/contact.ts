/**
 * Types TypeScript pour les contacts
 */

export interface Contact {
  id: string
  name: string
  email: string
  message: string
  budget?: string
  status: 'UNREAD' | 'READ' | 'ARCHIVED'
  createdAt: string
  updatedAt: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  budget?: string
}
