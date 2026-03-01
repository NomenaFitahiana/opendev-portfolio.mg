import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Badge } from "../ui/badge";

const steps = [
  {
    step: 1,
    title: "Expression du besoin",
    description: "Analyse technique et cadrage produit en 24h.",
  },
  {
    step: 2,
    title: "Constitution de la squad",
    description: "Sélection de devs spécialisés selon votre stack.",
  },
  {
    step: 3,
    title: "Développement agile",
    description: "Sprints, démos régulières et communication transparente.",
  },
  {
    step: 4,
    title: "Livraison & scaling",
    description: "Code propre, documenté et prêt pour la prod.",
  },
];

export function Process() {
  return (
    <section id="process" className="px-4 py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Badge variant={"secondary"}>How it works ?</Badge>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Comment ça marche
          </h2>
        </div>

        <Stepper defaultValue={1}>
          {steps.map(({ step, title, description }) => (
            <StepperItem
              className="relative flex-1 flex-col!"
              key={step}
              step={step}
            >
              <StepperTrigger className="flex-col gap-3 rounded">
                <StepperIndicator />
                <div className="space-y-0.5 px-2">
                  <StepperTitle>{title}</StepperTitle>
                  <StepperDescription className="max-sm:hidden">
                    {description}
                  </StepperDescription>
                </div>
              </StepperTrigger>
              {step < steps.length && (
                <StepperSeparator className="-order-1 -translate-y-1/2 absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] m-0 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
              )}
            </StepperItem>
          ))}
        </Stepper>
      </div>
    </section>
  );
}