/**
 * Composant carte réutilisable
 * Container avec ombre et bordure arrondie
 */

export default function Card({ children, className = '' }: any) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}
