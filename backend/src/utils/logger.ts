/** Logger personnalisé */
export function log(message: string, level: 'info' | 'error' | 'warn' = 'info') {
  const timestamp = new Date().toISOString()
  console[level](`[${timestamp}] ${message}`)
}
