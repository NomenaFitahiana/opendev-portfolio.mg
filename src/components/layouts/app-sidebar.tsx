"use client";

import { UserDropdown } from "@/components/layouts/user-dropdown";
import { Logo } from "@/components/logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  BarChart3,
  ChevronRight,
  Cpu,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Analytique", url: "/insights", icon: BarChart3 },
  { title: "Demandes de contact", url: "/contacts", icon: Inbox },
];

const contentItems = [
  {
    title: "Projets",
    icon: FolderKanban,
    newUrl: "/projects/new",
    items: [
      { title: "Tous les projets", url: "/projects" },
      { title: "Nouveau projet", url: "/projects/new" },
    ],
  },
  {
    title: "Technologies",
    icon: Cpu,
    newUrl: "/technologies/new",
    items: [
      { title: "Liste", url: "/technologies" },
      { title: "Nouvelle technologie", url: "/technologies/new" },
    ],
  },
  {
    title: "Témoignages",
    icon: MessageSquareQuote,
    newUrl: "/testimonials/new",
    items: [
      { title: "Liste", url: "/testimonials" },
      { title: "Nouveau témoignage", url: "/testimonials/new" },
    ],
  },
];

function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {mainItems.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(item.url + "/");
          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavContent() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Contenu</SidebarGroupLabel>
      <SidebarMenu>
        {contentItems.map((item) => {
          const isActive = item.items.some(
            (sub) => pathname === sub.url || pathname.startsWith(sub.url + "/"),
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={isActive}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <Link
                  href={item.newUrl}
                  title={`Nouveau — ${item.title}`}
                  className="absolute right-7 top-1/2 -translate-y-1/2 opacity-0 group-hover/collapsible:opacity-100 transition-opacity p-1 rounded hover:bg-sidebar-accent"
                >
                  <Plus className="size-3.5" />
                  <span className="sr-only">Créer</span>
                </Link>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((sub) => {
                      const isSubActive = pathname === sub.url;
                      return (
                        <SidebarMenuSubItem key={sub.url}>
                          <SidebarMenuSubButton asChild isActive={isSubActive}>
                            <Link href={sub.url}>{sub.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarLogoHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader className="px-3 py-3">
      {isCollapsed ? (
        <Logo className="w-8 h-8 rounded object-cover" withLabel={false} />
      ) : (
        <Logo
          className="w-9 h-9 rounded-lg"
          labelClassName="text-base"
          withLabel
        />
      )}
    </SidebarHeader>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();

  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarLogoHeader />

      <SidebarContent>
        <NavMain />
        <NavContent />
      </SidebarContent>

      <SidebarFooter className="group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
        <UserDropdown user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
