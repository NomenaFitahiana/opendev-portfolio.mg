/**
 * API Route Next.js pour le formulaire de contact
 * Alternative au backend direct
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Valider les données
    // Envoyer à l'API backend
    // Retourner la réponse
    
    return NextResponse.json({ message: 'Message envoyé avec succès' })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 })
  }
}
