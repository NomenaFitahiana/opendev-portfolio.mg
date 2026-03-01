import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-2xl px-8 py-16 text-center md:px-16">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />
          </div>

          <div className="relative">
            <p className="mb-4 text-md font-semibold text-(--main-color)">
              Prêt à démarrer ?
            </p>
            <h2 className="text-balance text-4xl font-extrabold">
              Construisons votre projet{" "}
              <span className="bg-linear-to-r from-slate-400 to-gray-500 bg-clip-text text-transparent">
                ensemble
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Un devis gratuit en 24h. Des développeurs sélectionnés, une
              livraison garantie.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="hover:opacity-90"
              >
                <Link href="/contact">
                  Demander un devis gratuit
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="/projects">Voir les projets</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
