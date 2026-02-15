/**
 * Composant modal réutilisable
 * Pour afficher du contenu en overlay
 */

export default function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
