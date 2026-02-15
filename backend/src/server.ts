/**
 * Point d'entrée de l'application backend
 * Configure Express, middlewares, routes et lance le serveur
 */

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import { errorMiddleware } from './middlewares/error.middleware'

// Charger les variables d'environnement
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middlewares globaux
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

// Middleware de gestion des erreurs (doit être en dernier)
app.use(errorMiddleware)

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
})
