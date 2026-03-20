import { RichSalesStat, ProjectActivityChart, ProjectsTable, ClientTypeChart, ClientSourceMeter } from "@/components/templates";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Dashboard" });

export default function Page() {
  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Vue d'ensemble</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Bienvenue sur le back-office du collectif.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RichSalesStat
          title="Projets"
          value={12}
          trendValue={20}
          footerLabel="2 nouveaux ce mois"
          footerSubtext="Comparé au mois précédent"
        />
        <RichSalesStat
          title="Technologies"
          value={34}
          trendValue={0}
          footerLabel="Stable"
          footerSubtext="Aucun ajout récent"
        />
        <RichSalesStat
          title="Témoignages"
          value={8}
          trendValue={14}
          footerLabel="1 nouveau cette semaine"
          footerSubtext="Taux de satisfaction élevé"
        />
        <RichSalesStat
          title="Demandes de contact"
          value={5}
          trendValue={-10}
          footerLabel="3 non lues"
          footerSubtext="À traiter rapidement"
        />
      </div>

      <ProjectActivityChart />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProjectsTable />
        </div>
        <ClientTypeChart />
      </div>

      <ClientSourceMeter />
    </div>
  );
}
