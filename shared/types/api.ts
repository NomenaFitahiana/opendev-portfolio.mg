/** Types pour les réponses API */
export interface ApiResponse<T> {
  data: T
  message?: string
}
