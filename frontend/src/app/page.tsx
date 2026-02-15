/**
 * Page d'accueil du portfolio
 * Affiche toutes les sections : Hero, Comment ça marche, Projets, etc.
 */

import HeroSection from '@/components/sections/HeroSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TechnologiesSection from '@/components/sections/TechnologiesSection'
import CollectiveSection from '@/components/sections/CollectiveSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <main>
      {/* Hero avec message principal et CTA */}
      <HeroSection />
      
      {/* Processus en 3-4 étapes */}
      <HowItWorksSection />
      
      {/* Grille de projets avec filtres */}
      <ProjectsSection />
      
      {/* Technologies maîtrisées */}
      <TechnologiesSection />
      
      {/* Statistiques du collectif */}
      <CollectiveSection />
      
      {/* Témoignages clients */}
      <TestimonialsSection />
      
      {/* Formulaire de contact */}
      <ContactSection />
    </main>
  )
}
