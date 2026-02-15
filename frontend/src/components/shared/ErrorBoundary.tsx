/**
 * Boundary pour gérer les erreurs React
 * Empêche le crash de toute l'application
 */

'use client'

import { Component, ReactNode } from 'react'

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div>Une erreur est survenue.</div>
    }
    return this.props.children
  }
}
