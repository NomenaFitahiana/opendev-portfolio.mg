"use client";

import { Avatar, AvatarImage } from "../ui/avatar";
import { MessageSquareShare, Star } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { HeroPill } from "../ui/hero-pill";
import { GridPattern } from "../ui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroProps {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

export const HeroSection = ({
  heading = "Développeurs d'élite à Madagascar, prêts à scaler votre SaaS",
  description = "OpenDev est un collectif de développeurs malgaches spécialisés en SaaS, MVP et applications sur mesure.",
  reviews = {
    count: 200,
    avatars: [
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-1.webp",
        alt: "Client 1",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
        alt: "Client 2",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-3.webp",
        alt: "Client 3",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-4.webp",
        alt: "Client 4",
      },
      {
        src: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
        alt: "Client 5",
      },
    ],
  },
}: HeroProps) => {
  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center px-6 py-24 lg:py-32">
      <div className="absolute inset-0 -z-10" />
      <GridPattern
        width={60}
        height={60}
        x={-1}
        y={-1}
        className={cn(
          "mask-[linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />

      <div className="container text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
          <HeroPill
            href="#"
            label="Pool actif · 40+ développeurs"
            announcement="Dev Mada 🇲🇬"
            isExternal
          />

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl">
            {heading}
          </h1>

          <p className="text-balance text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl">
            {description}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#contact" className={buttonVariants({ size: "lg" })}>
            Demander un devis gratuit
            <MessageSquareShare size={18} />
          </Link>

          <Link href="#projects" className={buttonVariants({ size: "lg", variant: "outline" })}>Voir nos projets</Link>
        </div>

        <div className="mx-auto mt-12 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="inline-flex items-center -space-x-4">
            {reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="size-12 border">
                <AvatarImage src={avatar.src} alt={avatar.alt} />
              </Avatar>
            ))}
          </span>

          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              +{reviews.count} projets livrés avec succès
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span>SaaS</span>
          <span>•</span>
          <span>MVP Startup</span>
          <span>•</span>
          <span>E-commerce</span>
          <span>•</span>
          <span>Applications sur mesure</span>
        </div>
      </div>
    </section>
  );
};
