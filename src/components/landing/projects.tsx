"use client";

import { useMemo, useState } from "react";
import { cn } from "@//lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const PROJECTS = [
  {
    id: 1,
    title: "Plateforme e-commerce B2B",
    desc: "Refonte complète d'une plateforme B2B avec dashboard analytics temps réel.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    kpi: "+40% conversions",
    category: "frontend",
  },
  {
    id: 2,
    title: "App Mobile Fintech",
    desc: "Application de paiement cross-platform avec APIs bancaires sécurisées.",
    tags: ["React Native", "Python", "AWS"],
    kpi: "50k users J+30",
    category: "mobile",
  },
  {
    id: 3,
    title: "Dashboard SaaS Analytics",
    desc: "Dashboard analytics avec visualisations avancées et exports.",
    tags: ["Next.js", "FastAPI", "MongoDB"],
    kpi: "-60% temps reporting",
    category: "backend",
  },
];

export function Projects() {
  const [filter, setFilter] = useState("tous");

  const filtered = useMemo(() => {
    if (filter === "tous") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const categories = ["tous", "frontend", "backend", "mobile"];

  return (
    <section id="projects" className="px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-2 text-2xl font-extrabold md:text-4xl">
              Projets récents
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={cn(
                  "capitalize",
                  filter === cat &&
                  "bg-yellow-400 text-black hover:bg-yellow-400/90"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Card
              key={project.id}
              className="group border-muted/40 transition-all hover:-translate-y-1 hover:border-yellow-400/40"
            >
              <CardHeader>
                <Badge className="w-fit bg-green-500/10 text-green-400">
                  {project.kpi}
                </Badge>
                <CardTitle className="text-xl">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="mb-2 text-sm text-muted-foreground">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
