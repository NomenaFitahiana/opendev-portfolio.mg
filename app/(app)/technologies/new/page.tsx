import { createMetadata } from "@/lib/metadata";
import { TechnologyForm } from "@/components/templates";

export const metadata = createMetadata({ title: "Nouvelle technologie" });

export default function Page() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nouvelle technologie</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Ajoutez une nouvelle technologie à votre portfolio.
        </p>
      </div>
      <TechnologyForm />
    </div>
  );
}