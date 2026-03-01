import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const items = [
  {
    content:
      "Présentez vos projets développés avec OpenDev Madagascar. Téléchargez des captures d'écran, des descriptions détaillées et des liens vers vos projets. Mettez en avant votre travail et impressionnez les recruteurs et clients potentiels.",
    id: "1",
    sub: "Partagez vos réalisations et projets",
    title: "Portfolio de projets",
  },
  {
    content:
      "Connectez-vous avec d'autres développeurs de la communauté OpenDev Madagascar. Découvrez les profils, collaborez sur des projets, partagez vos expériences et construisez votre réseau professionnel. Participez à la croissance collective du développement à Madagascar.",
    id: "2",
    sub: "Rejoignez la communauté de développeurs",
    title: "Réseau collectif",
  },
  {
    content:
      "Mettez à jour votre profil professionnel avec vos compétences, votre expérience et vos certifications. Ajoutez vos liens GitHub, LinkedIn et autres portfolios. Rendez votre profil visible aux opportunités et collaborations.",
    id: "3",
    sub: "Complétez votre profil développeur",
    title: "Profil professionnel",
  },
  {
    content:
      "L'équipe OpenDev Madagascar est disponible pour vous soutenir. Pour des questions sur la plateforme, les fonctionnalités ou les collaborations, contactez-nous par email à support@opendev-madagascar.mg ou via notre formulaire de contact. Nous répondons rapidement à vos demandes.",
    id: "4",
    sub: "Nous sommes là pour vous aider",
    title: "Support et contact",
  },
  {
    content:
      "Oui, OpenDev Madagascar est une plateforme gratuite et ouverte à tous les développeurs. Vous pouvez créer un compte, afficher votre portfolio et participer à la communauté sans frais.",
    id: "5",
    sub: "Aucun coût caché",
    title: "La plateforme est-elle gratuite ?",
  },
  {
    content:
      "Vous pouvez créer un compte en quelques minutes. Inscrivez-vous avec votre email, complétez votre profil avec vos informations professionnelles et commencez à partager vos projets immédiatement.",
    id: "6",
    sub: "Processus d'inscription rapide",
    title: "Comment commencer ?",
  },
  {
    content:
      "Oui, vous pouvez lister vos projets personnels, vos contributions open source ou vos projets académiques. Montrez votre expertise à travers vos réalisations et attirez l'attention des recruteurs.",
    id: "7",
    sub: "Partagez tous types de projets",
    title: "Puis-je ajouter mes projets personnels ?",
  },
];

export function FAQSection() {
  return (
    <section>
      <div className="py-8">
        <div className="space-y-4 container mx-auto w-full max-w-3xl px-6">
          <h2 className="font-bold text-2xl">À propos d'OpenDev Madagascar</h2>
          <Accordion className="w-full" collapsible defaultValue="1" type="single">
            {items.map((item) => (
              <AccordionItem className="py-2" key={item.id} value={item.id}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between rounded-md py-2 text-left font-semibold text-[15px] leading-6 outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                    <span className="flex flex-col space-y-1">
                      <span>{item.title}</span>
                      {item.sub && (
                        <span className="font-normal text-sm">{item.sub}</span>
                      )}
                    </span>
                    <PlusIcon
                      aria-hidden="true"
                      className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                      size={16}
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-2 text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
