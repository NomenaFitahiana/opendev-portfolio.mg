/**
 * Service d'envoi d'emails
 * Utilise Nodemailer pour envoyer des emails
 */

import nodemailer from 'nodemailer'
import { config } from '../config/environment'

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
})

// Envoyer un email générique
export async function sendEmail(to: string, subject: string, html: string) {
  // Utiliser transporter.sendMail()
}

// Email de confirmation après demande de contact
export async function sendContactConfirmation(to: string, name: string) {
  // Construire le HTML de l'email
  // Envoyer avec sendEmail()
}

// Notification aux admins pour nouveau contact
export async function notifyAdminNewContact(contactData: any) {
  // Construire le HTML
  // Envoyer aux admins
}
