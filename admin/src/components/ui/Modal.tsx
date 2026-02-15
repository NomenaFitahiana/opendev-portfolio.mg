/** Modal réutilisable */
export default function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null
  return <div className="modal">{children}</div>
}
