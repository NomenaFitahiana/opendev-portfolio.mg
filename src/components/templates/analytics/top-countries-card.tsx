/**
 * top-countries-card.tsx
 *
 * Liste des 6 pays les plus représentés parmi les visiteurs.
 * Affiche un flag, le nom du pays, le nombre de visiteurs
 * et une barre de progression relative au pays le plus visité.
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
import { Separator } from "@/components/ui/separator";
import type { TopCountry } from "@/types/analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TopCountriesCardProps {
  data: TopCountry[];
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function TopCountriesCard({ data }: TopCountriesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pays</CardTitle>
        <CardDescription>
          Répartition géographique des visiteurs
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-0">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Aucune donnée disponible
          </p>
        ) : (
          data.map((country, index) => (
            <div key={country.country}>
              <div className="flex items-center gap-3 py-2.5">
                <span className="text-lg leading-none">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {country.country}
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {country.visitors.toLocaleString("fr-FR")}
                    </span>
                  </div>
                  <Progress value={country.pct} className="h-1" />
                </div>
              </div>
              {index < data.length - 1 && <Separator />}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
