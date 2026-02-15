/**
 * Types TypeScript pour les technologies
 */

export interface Technology {
  id: string
  name: string
  category: TechCategory
  logo?: string
  createdAt: string
  updatedAt: string
}

export type TechCategory = 
  | 'FRONTEND' 
  | 'BACKEND' 
  | 'MOBILE' 
  | 'DATABASE' 
  | 'DEVOPS' 
  | 'DESIGN' 
  | 'OTHER'
