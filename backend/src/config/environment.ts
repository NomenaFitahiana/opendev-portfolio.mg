/**
 * Configuration et validation des variables d'environnement
 * S'assure que toutes les variables requises sont présentes
 */

export const config = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  email: {
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER!,
    password: process.env.EMAIL_PASSWORD!,
    from: process.env.EMAIL_FROM!,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
  urls: {
    frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
    admin: process.env.ADMIN_URL || 'http://localhost:5173',
  },
}

// Validation : lever une erreur si une variable critique manque
function validateConfig() {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Variables d'environnement manquantes : ${missing.join(', ')}`)
  }
}

validateConfig()
