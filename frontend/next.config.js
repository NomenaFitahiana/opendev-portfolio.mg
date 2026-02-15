/**
 * Configuration Next.js
 * Optimisations pour les images, SEO et performance
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration des images optimisées
  images: {
    domains: ['res.cloudinary.com'], // Domaines autorisés pour les images
    formats: ['image/avif', 'image/webp'],
  },
  
  // Optimisation du bundle
  swcMinify: true,
  
  // Variables d'environnement publiques
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
