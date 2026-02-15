/**
 * Configuration Tailwind CSS pour le frontend
 * Définit les couleurs, polices et thème personnalisés
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ajoutez vos couleurs personnalisées ici
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
      },
      fontFamily: {
        // Définir les polices personnalisées
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
