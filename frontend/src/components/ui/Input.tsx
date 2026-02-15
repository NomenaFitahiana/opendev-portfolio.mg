/**
 * Champ de saisie réutilisable
 * Avec gestion d'erreur et label
 */

export default function Input({ label, error, ...props }: any) {
  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}
