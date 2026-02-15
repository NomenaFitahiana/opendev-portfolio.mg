/**
 * Zone de texte réutilisable
 * Pour formulaires de contact ou descriptions
 */

export default function Textarea({ label, error, ...props }: any) {
  return (
    <div className="textarea-wrapper">
      {label && <label>{label}</label>}
      <textarea {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}
