/**
 * Composant bouton réutilisable
 * Variantes : primary, secondary, outline, ghost
 */

export default function Button({ children, variant = 'primary', ...props }: any) {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  )
}
