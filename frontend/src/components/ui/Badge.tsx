/**
 * Badge pour afficher les technologies
 * Petit tag coloré avec icône optionnelle
 */

export default function Badge({ children, color = 'blue' }: any) {
  return (
    <span className={`badge badge-${color}`}>
      {children}
    </span>
  )
}
