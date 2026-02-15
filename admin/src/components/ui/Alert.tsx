/** Alerte/Notification */
export default function Alert({ type, message }: any) { return <div className={`alert-${type}`}>{message}</div> }
