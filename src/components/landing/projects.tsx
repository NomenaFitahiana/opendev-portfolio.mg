"use client";

import { useState, useMemo } from "react";
import {
  Badge,
} from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  BarChart2,
  Star,
  ExternalLink,
  X,
} from "lucide-react";

type Industry =
  | "Tous"
  | "E-commerce"
  | "Fintech"
  | "Santé"
  | "Éducation"
  | "SaaS"
  | "Logistique";

type SortKey = "date" | "pertinence" | "popularite";

interface ProjectTech {
  name: string;
  color: string;
}

interface Testimonial {
  author: string;
  role: string;
  company: string;
  content: string;
}

interface Project {
  id: string;
  title: string;
  client: string;
  clientVisible: boolean;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  technologies: ProjectTech[];
  industry: Exclude<Industry, "Tous">;
  duration: string;
  teamSize: number;
  metrics: string[];
  featured: boolean;
  date: string;
  popularity: number;
  testimonial?: Testimonial;
  imageUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Plateforme e-commerce B2B",
    client: "Client A",
    clientVisible: false,
    shortDescription:
      "Marketplace B2B avec gestion multi-vendeurs, facturation automatisée et tableau de bord analytics.",
    fullDescription:
      "Développement d'une plateforme e-commerce B2B complète pour une PME malgache souhaitant digitaliser ses ventes. La solution inclut un back-office avancé, une gestion des stocks en temps réel et une intégration avec les principaux opérateurs de paiement mobile.",
    problem:
      "Le client gérait ses commandes via Excel et email, ce qui engendrait des erreurs fréquentes et des pertes de temps considérables.",
    solution:
      "Nous avons conçu une plateforme centralisée avec gestion des commandes, stock, facturation et reporting, réduisant le temps de traitement des commandes de 70%.",
    technologies: [
      { name: "Next.js", color: "bg-zinc-100 text-zinc-700 border-zinc-200" },
      { name: "PostgreSQL", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
      { name: "Stripe", color: "bg-purple-50 text-purple-700 border-purple-200" },
      { name: "Prisma", color: "bg-slate-50 text-slate-700 border-slate-200" },
    ],
    industry: "E-commerce",
    duration: "3 mois",
    teamSize: 4,
    metrics: ["+40% de conversions", "-70% temps de traitement", "2 000+ commandes/mois"],
    featured: true,
    date: "2025-10-01",
    popularity: 92,
    testimonial: {
      author: "Rakoto Jean",
      role: "Directeur commercial",
      company: "Client A",
      content:
        "L'équipe OpenDev a livré exactement ce dont nous avions besoin, dans les délais et avec une qualité irréprochable.",
    },
    imageUrl: "/projects/ecommerce.webp"
  },
  {
    id: "2",
    title: "App mobile de microfinance",
    client: "FinoPay",
    clientVisible: true,
    shortDescription:
      "Application mobile de prêt entre pairs avec scoring de crédit basé sur l'historique transactionnel.",
    fullDescription:
      "FinoPay souhaitait démocratiser l'accès au crédit en milieu rural malgache. Nous avons développé une app React Native intégrant un système de scoring automatique et des remboursements via Mobile Money.",
    problem:
      "Les populations rurales n'ont pas accès aux services bancaires traditionnels et ne peuvent obtenir de crédit.",
    solution:
      "App mobile avec scoring alternatif basé sur l'historique de paiement Mobile Money, permettant des micro-prêts sans compte bancaire.",
    technologies: [
      { name: "React Native", color: "bg-sky-50 text-sky-700 border-sky-200" },
      { name: "FastAPI", color: "bg-teal-50 text-teal-700 border-teal-200" },
      { name: "PostgreSQL", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
      { name: "Redis", color: "bg-red-50 text-red-700 border-red-200" },
    ],
    industry: "Fintech",
    duration: "5 mois",
    teamSize: 5,
    metrics: ["10 000+ utilisateurs", "98% de taux de remboursement", "4.8/5 sur l'app store"],
    featured: true,
    date: "2025-07-01",
    popularity: 88,
    imageUrl: "/projects/microfinance-mobile-app.avif"
  },
  {
    id: "3",
    title: "LMS pour établissement scolaire",
    client: "Client B",
    clientVisible: false,
    shortDescription:
      "Plateforme de gestion des apprentissages avec cours en ligne, quiz interactifs et suivi des progrès.",
    fullDescription:
      "Création d'un Learning Management System (LMS) sur mesure pour un réseau d'écoles privées, avec gestion des enseignants, élèves, cours et évaluations.",
    problem:
      "L'établissement manquait d'outils numériques pour centraliser les cours, les devoirs et le suivi des élèves.",
    solution:
      "Plateforme LMS avec espace enseignant et espace élève, quiz auto-corrigés, notifications et tableau de bord de progression.",
    technologies: [
      { name: "React.js", color: "bg-blue-100 text-blue-700 border-blue-200" },
      { name: "Spring Boot", color: "bg-green-50 text-green-700 border-green-200" },
      { name: "PostgreSQL", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
    ],
    industry: "Éducation",
    duration: "4 mois",
    teamSize: 3,
    metrics: ["500+ élèves actifs", "+60% engagement cours", "30+ enseignants"],
    featured: false,
    date: "2025-04-01",
    popularity: 74,
    imageUrl: "/projects/omega-school.png"
  },
  {
    id: "4",
    title: "SaaS de gestion logistique",
    client: "LogiMada",
    clientVisible: true,
    shortDescription:
      "Outil de suivi des livraisons en temps réel avec optimisation de tournées et gestion des chauffeurs.",
    fullDescription:
      "LogiMada avait besoin d'un outil de dispatch et de suivi de flotte pour ses 50+ chauffeurs. Nous avons livré un SaaS avec une carte en temps réel, un algorithme d'optimisation de tournées et une app chauffeur.",
    problem:
      "Coordination manuelle des livraisons par téléphone, entraînant des retards et des coûts carburant élevés.",
    solution:
      "SaaS de dispatch avec tableau de bord temps réel, optimisation des itinéraires et application mobile chauffeur.",
    technologies: [
      { name: "React", color: "bg-sky-50 text-sky-700 border-sky-200" },
      { name: "Node.js", color: "bg-green-50 text-green-700 border-green-200" },
      { name: "PostgreSQL", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
      { name: "WebSocket", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    ],
    industry: "Logistique",
    duration: "6 mois",
    teamSize: 6,
    metrics: ["-30% coûts carburant", "+50% livraisons/jour", "50+ chauffeurs actifs"],
    featured: false,
    date: "2024-12-01",
    popularity: 80,
    imageUrl: "/projects/logistic.jpg"
  },
];

const INDUSTRIES: Industry[] = [
  "Tous",
  "E-commerce",
  "Fintech",
  "Santé",
  "Éducation",
  "SaaS",
  "Logistique",
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date", label: "Plus récents" },
  { value: "pertinence", label: "Pertinence" },
  { value: "popularite", label: "Popularité" },
];

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
    >
      <Card
        className={cn(
          "p-0 flex flex-col gap-3 overflow-hidden group bg-card h-full cursor-pointer",
          "hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
          project.featured && "ring-1 ring-primary/20"
        )}
        onClick={onClick}
      >
        <div className="h-40 bg-muted rounded-t-lg relative overflow-hidden">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-4xl text-muted-foreground/30 font-bold select-none">
              {project.title.charAt(0)}
            </div>
          )}
          {project.imageUrl && (
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10" />
          )}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground text-xs gap-1 px-2 py-0.5">
                <Star className="w-3 h-3" /> Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/80 text-xs backdrop-blur-sm">
              {project.industry}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 flex flex-col gap-2">
          <div>
            <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {project.clientVisible ? project.client : "Client confidentiel"}
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech.name}
                className={cn(
                  "text-xs px-2 py-0.5 rounded-md border font-medium",
                  tech.color
                )}
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-md border bg-muted text-muted-foreground">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {project.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {project.teamSize} devs
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectDetail({
  project,
}: {
  project: Project;
}) {
  return (
    <DialogContent className="md:min-w-2xl max-h-[90vh] overflow-y-auto p-0">
      <div className="max-h-full bg-muted rounded-t-lg relative overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-6xl text-muted-foreground/20 font-bold select-none">
            {project.title.charAt(0)}
          </span>
        )}
        {project.imageUrl && (
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        )}
        {project.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Star className="w-3 h-3" /> Featured
            </Badge>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-6">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {project.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {project.clientVisible ? project.client : "Client confidentiel"} •{" "}
                {project.industry}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {project.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" /> {project.teamSize} développeurs
          </span>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
            À propos du projet
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        <Separator />

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              🎯 Problématique
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              ✅ Solution apportée
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2 uppercase tracking-wide">
            <BarChart2 className="w-4 h-4" /> Résultats mesurables
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <Badge
                key={m}
                variant="secondary"
                className="text-sm px-3 py-1"
              >
                {m}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
            Stack technique
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech.name}
                className={cn(
                  "text-sm px-3 py-1 rounded-lg border font-medium",
                  tech.color
                )}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {project.testimonial && (
          <>
            <Separator />
            <div className="bg-muted/40 rounded-xl p-5">
              <p className="text-sm text-muted-foreground italic leading-relaxed mb-3">
                &ldquo;{project.testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {project.testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {project.testimonial.author}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.testimonial.role} — {project.testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DialogContent>
  );
}

export function Projects() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>("Tous");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    let list =
      activeIndustry === "Tous"
        ? [...PROJECTS]
        : PROJECTS.filter((p) => p.industry === activeIndustry);

    list.sort((a, b) => {
      if (sortKey === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortKey === "popularite") return b.popularity - a.popularity;
      return Number(b.featured) - Number(a.featured);
    });

    return list;
  }, [activeIndustry, sortKey]);

  return (
    <section id="projets" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 text-xs tracking-widest uppercase px-3 py-1"
          >
            Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Nos projets réalisés
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Découvrez une sélection de projets livrés par le pool OpenDev,
            chacun reflétant notre engagement pour la qualité et l&apos;impact.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <Button
                key={ind}
                variant={activeIndustry === ind ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveIndustry(ind)}
                className={cn(
                  "rounded-lg text-sm",
                  activeIndustry !== ind && "text-muted-foreground hover:text-foreground"
                )}
              >
                {ind}
              </Button>
            ))}
          </div>

          <Select
            value={sortKey}
            onValueChange={(v) => setSortKey(v as SortKey)}
          >
            <SelectTrigger className="w-40 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            Aucun projet dans cette catégorie pour le moment.
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Voir tous les projets
          </Button>
        </div>
      </div>

      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
          />
        )}
      </Dialog>
    </section>
  );
}
