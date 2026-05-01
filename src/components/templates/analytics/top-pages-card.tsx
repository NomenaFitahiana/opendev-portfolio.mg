/**
 * top-pages-card.tsx
 *
 * Liste des 6 pages les plus visitées avec une barre de progression relative.
 * Composant purement présentationnel — aucun état, aucun fetch.
 */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TopPage } from "@/types/analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TopPagesCardProps {
  data: TopPage[];
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function TopPagesCard({ data }: TopPagesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pages populaires</CardTitle>
        <CardDescription>Par nombre de vues — ce mois</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Aucune donnée disponible
          </p>
        ) : (
          data.map((page) => (
            <div key={page.path} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-mono text-xs text-muted-foreground truncate max-w-[180px]">
                  {page.path}
                </span>
                <span className="font-medium tabular-nums text-xs ml-2 shrink-0">
                  {page.views.toLocaleString("fr-FR")}
                </span>
              </div>
              <Progress value={page.pct} className="h-1.5" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
