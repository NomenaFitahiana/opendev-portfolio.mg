"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { Users, FolderCheck, Globe, Zap, RefreshCw, ShieldCheck, TrendingUp } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  sublabel?: string;
  cardBg: string;
  iconBg: string;
  iconColor: string;
  valueColor: string;
}

interface Advantage {
  icon: React.ReactNode;
  title: string;
  description: string;
  cardBg: string;
  iconBg: string;
  borderColor: string;
}

const STATS: Stat[] = [
  {
    icon: <Users className="w-5 h-5" />,
    value: "40+",
    label: "Développeurs",
    sublabel: "dans le pool",
    cardBg: "bg-blue-50/80 dark:bg-blue-950/30",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    valueColor: "text-blue-700 dark:text-blue-300",
  },
  {
    icon: <FolderCheck className="w-5 h-5" />,
    value: "5+",
    label: "Projets livrés",
    sublabel: "depuis 2025",
    cardBg: "bg-emerald-50/80 dark:bg-emerald-950/30",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    valueColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    value: "5+",
    label: "Clients servis",
    sublabel: "locaux & internationaux",
    cardBg: "bg-violet-50/80 dark:bg-violet-950/30",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    valueColor: "text-violet-700 dark:text-violet-300",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    value: "98%",
    label: "Taux de satisfaction",
    sublabel: "clients",
    cardBg: "bg-amber-50/80 dark:bg-amber-950/30",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    valueColor: "text-amber-700 dark:text-amber-300",
  },
];

const ADVANTAGES: Advantage[] = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Agilité maximale",
    description:
      "Constituez une équipe sur-mesure en quelques jours. Pas de sureffectif, pas de sous-effectif — exactement ce qu'il faut, quand il le faut.",
    cardBg: "bg-sky-50/70 dark:bg-sky-950/25",
    iconBg: "bg-sky-500",
    borderColor: "border-sky-100 dark:border-sky-900",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Expertise variée",
    description:
      "Chaque projet bénéficie des meilleurs profils disponibles dans le pool, sélectionnés selon les technologies et les enjeux spécifiques de votre mission.",
    cardBg: "bg-teal-50/70 dark:bg-teal-950/25",
    iconBg: "bg-teal-500",
    borderColor: "border-teal-100 dark:border-teal-900",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Qualité garantie",
    description:
      "La rémunération à la livraison assure l'engagement total de chaque développeur. Chez OpenDev, la qualité n'est pas une option — c'est notre modèle.",
    cardBg: "bg-rose-50/70 dark:bg-rose-950/25",
    iconBg: "bg-rose-500",
    borderColor: "border-rose-100 dark:border-rose-900",
  },
];

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={cn("flex flex-col gap-2 p-2 border border-border hover:shadow-md transition-shadow h-full", stat.cardBg)}>
        <CardContent className="p-2 flex flex-col items-center text-center gap-3">
          <div className={cn("p-2.5 rounded-xl", stat.iconBg, stat.iconColor)}>
            {stat.icon}
          </div>
          <div>
            <div className={cn("text-4xl font-bold tracking-tight", stat.valueColor)}>
              {stat.value}
            </div>
            <div className="text-sm font-medium text-foreground mt-1">
              {stat.label}
            </div>
            {stat.sublabel && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.sublabel}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Collective() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="collectif" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 text-xs tracking-widest uppercase px-3 py-1"
          >
            Le collectif
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Un pool de talents,{" "}
            <span className="text-muted-foreground font-normal">
              une force collective
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            OpenDev repose sur un modèle unique : des développeurs malgaches
            sélectionnés projet par projet, rémunérés à la livraison. Flexibilité
            et excellence, sans compromis.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        <div ref={sectionRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
              Pourquoi le modèle flexible est un avantage
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Card className={cn("flex flex-col gap-2 p-3 border h-full hover:shadow-md transition-shadow", adv.cardBg, adv.borderColor)}>
                  <CardContent className="p-2 flex flex-col gap-4">
                    <div className={cn("p-2.5 w-fit rounded-xl text-white", adv.iconBg)}>
                      {adv.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1.5">
                        {adv.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {adv.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
