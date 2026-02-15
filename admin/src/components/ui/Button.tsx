/** Bouton réutilisable */
export default function Button({ children, ...props }: any) {
  return <button {...props}>{children}</button>
}
