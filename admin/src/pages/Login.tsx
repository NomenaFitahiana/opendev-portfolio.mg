/**
 * Page de connexion du panel admin
 * Formulaire email + mot de passe
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Appeler login()
    // Rediriger vers le dashboard si succès
  }

  return (
    <div className="login-page">
      {/* Formulaire de connexion */}
      {/* Logo OpenDev */}
      {/* Champs email et password */}
      {/* Bouton de connexion */}
      {/* Lien "Mot de passe oublié" (optionnel) */}
    </div>
  )
}
