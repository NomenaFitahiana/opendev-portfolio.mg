/** Context d'authentification */
import { createContext, useState, ReactNode } from 'react'

interface AuthContextType {
  user: any | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  
  const login = async (email: string, password: string) => {
    // Implémenter la logique de login
  }
  
  const logout = () => {
    setUser(null)
    setToken(null)
  }
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
