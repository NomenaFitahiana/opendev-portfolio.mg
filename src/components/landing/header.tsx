"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, PhoneCall, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const PROJETS: { title: string; href: string; description: string }[] = [
  {
    title: "E-commerce B2B",
    href: "#projets",
    description: "Plateforme de commandes avec dashboard analytique temps réel.",
  },
  {
    title: "App Mobile Fintech",
    href: "#projets",
    description: "Paiement mobile cross-platform avec intégration bancaire sécurisée.",
  },
  {
    title: "SaaS Analytics",
    href: "#projets",
    description: "Dashboard de suivi de campagnes avec exports avancés.",
  },
  {
    title: "API Microservices",
    href: "#projets",
    description: "Architecture découplée pour scaler une app monolithique.",
  },
];

const SERVICES: { title: string; href: string; description: string }[] = [
  {
    title: "Développement Web",
    href: "#services",
    description: "Applications React, Next.js et Node.js sur mesure.",
  },
  {
    title: "Mobile",
    href: "#services",
    description: "Apps React Native et Flutter cross-platform.",
  },
  {
    title: "Backend & API",
    href: "#services",
    description: "APIs REST et GraphQL robustes et documentées.",
  },
  {
    title: "DevOps & Cloud",
    href: "#services",
    description: "CI/CD, Docker, déploiement AWS et Vercel.",
  },
];

const MOBILE_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "Technologies", href: "#technologies" },
  { label: "Le Collectif", href: "#le-collectif" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Contact", href: "#contact" },
];

function NavListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-400/10 hover:text-gray-900 focus:bg-gray-400/10 focus:text-gray-400"
        >
          <div className="mb-1 text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/8 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/logo_opendev.webp" alt="opendev_logo" className="w-12 h-12 object-cover rounded-lg" />
          <h3 className="text-lg tracking-tight">OpenDev</h3>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavigationMenu>
            <NavigationMenuList>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm text-muted-foreground hover:text-gray-700">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-110 grid-cols-2 gap-2 p-3">
                    {SERVICES.map((s) => (
                      <NavListItem key={s.title} title={s.title} href={s.href}>
                        {s.description}
                      </NavListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm text-muted-foreground hover:text-gray-700">
                  Projets
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-125 grid-cols-2 gap-2 p-3">
                    {PROJETS.map((p) => (
                      <NavListItem key={p.title} title={p.title} href={p.href}>
                        {p.description}
                      </NavListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {[
                { label: "Technologies", href: "#technologies" },
                { label: "Le Collectif", href: "#le-collectif" },
              ].map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-sm text-muted-foreground hover:text-gray-600"
                    )}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>

          <Link href="#contact" className={buttonVariants({ variant: "outline", size: "sm" })}>Nous contacter <PhoneCall size={16} /></Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-gray-400 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/8 transition-all duration-300 md:hidden",
          open ? "max-h-screen" : "max-h-0"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-gray-400/10 hover:text-gray-400"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-white/8 pt-4">
            <Button
              asChild
              variant={"outline"}
              className="w-full"
            >
              <Link href="#contact" onClick={() => setOpen(false)}>
                Demander un devis <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
