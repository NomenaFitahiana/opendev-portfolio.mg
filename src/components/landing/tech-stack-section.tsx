"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../icons";

type TechCategory =
  | "Tous"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "Database"
  | "DevOps";

interface Technology {
  name: string;
  category: Exclude<TechCategory, "Tous">;
  icon: keyof typeof Icons;
}

const CATEGORIES: TechCategory[] = [
  "Tous",
  "Frontend",
  "Backend",
  "Mobile",
  "Database",
  "DevOps",
];

const TECHNOLOGIES: Technology[] = [
  { name: "React", category: "Frontend", icon: "react" },
  { name: "Next.js", category: "Frontend", icon: "nextjs" },
  { name: "Vue.js", category: "Frontend", icon: "vue" },
  { name: "TailwindCSS", category: "Frontend", icon: "tailwind" },
  { name: "TypeScript", category: "Frontend", icon: "typescript" },
  { name: "Framer Motion", category: "Frontend", icon: "framer" },
  { name: "Astro", category: "Frontend", icon: "astro" },

  { name: "Node.js", category: "Backend", icon: "node" },
  { name: "NestJS", category: "Backend", icon: "nest" },
  { name: "FastAPI", category: "Backend", icon: "fastapi" },
  { name: "Django", category: "Backend", icon: "django" },
  { name: "GraphQL", category: "Backend", icon: "graphql" },
  { name: "Express", category: "Backend", icon: "express" },

  { name: "Flutter", category: "Mobile", icon: "flutter" },
  { name: "Expo", category: "Mobile", icon: "expo" },

  { name: "PostgreSQL", category: "Database", icon: "postgres" },
  { name: "MongoDB", category: "Database", icon: "mongo" },
  { name: "Redis", category: "Database", icon: "redis" },
  { name: "Prisma", category: "Database", icon: "prisma" },
  { name: "Supabase", category: "Database", icon: "supabase" },

  { name: "Docker", category: "DevOps", icon: "docker" },
  { name: "GitHub Actions", category: "DevOps", icon: "github" },
  { name: "Vercel", category: "DevOps", icon: "vercel" },
  { name: "Render", category: "DevOps", icon: "render" },
  { name: "AWS", category: "DevOps", icon: "aws" },
];

const CATEGORY_COLORS: Record<
  Exclude<TechCategory, "Tous">,
  string
> = {
  Frontend:
    "bg-blue-50/70 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
  Backend:
    "bg-green-50/70 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800",
  Mobile:
    "bg-purple-50/70 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
  Database:
    "bg-orange-50/70 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
  DevOps:
    "bg-muted/70 text-muted-foreground border-border dark:bg-muted dark:text-muted-foreground",
};

const CATEGORY_DOT: Record<
  Exclude<TechCategory, "Tous">,
  string
> = {
  Frontend: "bg-blue-500",
  Backend: "bg-green-500",
  Mobile: "bg-purple-500",
  Database: "bg-orange-500",
  DevOps: "bg-zinc-500",
};

export function TechStack() {
  const [activeCategory, setActiveCategory] =
    useState<TechCategory>("Tous");

  const filtered =
    activeCategory === "Tous"
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter(
        (t) => t.category === activeCategory
      );

  return (
    <section id="technologies" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 text-xs tracking-widest uppercase px-3 py-1"
          >
            Stack technique
          </Badge>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Technologies maîtrisées
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Notre pool couvre un large spectre de technologies modernes,
            sélectionnées selon les besoins de chaque projet.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-md text-sm transition-all",
                activeCategory !== cat &&
                "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech) => {
              const Icon = Icons[tech.icon];
              return (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                >
                  <div
                    className={cn(
                      "flex items-center gap-2.5 px-4 py-3 rounded-lg border text-sm font-medium",
                      "hover:shadow-sm transition-shadow cursor-default select-none",
                      CATEGORY_COLORS[tech.category]
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="truncate">{tech.name}</span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-5 mt-12 pt-8 border-t border-border">
          {(
            Object.entries(CATEGORY_DOT) as [
              Exclude<TechCategory, "Tous">,
              string
            ][]
          ).map(([cat, dot]) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span
                className={cn(
                  "inline-block w-2 h-2 rounded-full",
                  dot
                )}
              />
              <span className="text-xs text-muted-foreground">
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
