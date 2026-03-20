"use client";

import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MessageSquare, BookOpen, RefreshCw } from "lucide-react";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  projects: "Projets",
  technologies: "Technologies",
  testimonials: "Témoignages",
  stats: "Statistiques",
  contacts: "Demandes de contact",
  new: "Nouveau",
  edit: "Modifier",
};

const useBreadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const url = "/" + segments.slice(0, index + 1).join("/");
    const label = routeLabels[segment] ?? segment;
    const isLast = index === segments.length - 1;
    return { label, url, isLast };
  });
};

export function AppHeader() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between px-6 border-b">
      <div className="w-32" />

      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.url} className="flex items-center gap-1">
            {index > 0 && (
              <span className="text-muted-foreground/40 select-none">/</span>
            )}
            {crumb.isLast ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <a
                href={crumb.url}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </a>
            )}
          </span>
        ))}
      </nav>

      <div className="flex items-center justify-end w-32">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="h-8 w-8">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>
              <MessageSquare className="size-4 text-muted-foreground" />
              Donner un feedback
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpen className="size-4 text-muted-foreground" />
              Documentation
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.location.reload()}>
              <RefreshCw className="size-4 text-muted-foreground" />
              Rafraîchir la page
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

