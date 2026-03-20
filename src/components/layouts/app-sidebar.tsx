"use client";

import { authClient } from "@/lib/auth-client";
import {
  LayoutDashboard,
  FolderKanban,
  Cpu,
  MessageSquareQuote,
  BarChart3,
  Inbox,
} from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail } from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { UserDropdown } from "./user-dropdown";
import { Logo } from "../logo";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projets",
    url: "/projects",
    icon: FolderKanban,
    items: [
      { title: "Liste des projets", url: "/projects" },
      { title: "Nouveau projet", url: "/projects/new" },
    ],
  },
  {
    title: "Technologies",
    url: "/technologies",
    icon: Cpu,
    items: [
      { title: "Liste", url: "/technologies" },
      { title: "Nouvelle technologie", url: "/technologies/new" },
    ],
  },
  {
    title: "Témoignages",
    url: "/testimonials",
    icon: MessageSquareQuote,
    items: [
      { title: "Liste", url: "/testimonials" },
      { title: "Nouveau témoignage", url: "/testimonials/new" },
    ],
  },
  {
    title: "Statistiques",
    url: "/stats",
    icon: BarChart3,
  },
  {
    title: "Demandes de contact",
    url: "/contacts",
    icon: Inbox,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();

  const user = {
    name: session?.user?.name ?? "Admin",
    avatar: session?.user?.image ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-4 py-2 w-full font-semibold text-sm tracking-tight">
        <Logo className="w-10 h-10 rounded-lg" labelClassName={"text-lg"} withLabel />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
