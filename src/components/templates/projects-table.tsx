import {
  Edit2Icon,
  FileDownIcon,
  ListFilterIcon,
  MoreHorizontalIcon,
  NotepadTextIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ProjectRow = {
  id: string;
  title: string;
  client: string;
  image: string;
  technologies: string[];
  status: "completed" | "in-progress" | "featured";
  teamSize: number;
  duration: string;
};

const projects: ProjectRow[] = [
  {
    id: "PROJ-001",
    title: "Plateforme e-commerce",
    client: "RetailMada",
    image: "https://picsum.photos/id/14/80/80",
    technologies: ["Next.js", "Stripe"],
    status: "completed",
    teamSize: 3,
    duration: "2 mois",
  },
  {
    id: "PROJ-002",
    title: "App de gestion RH",
    client: "CorpMG",
    image: "https://picsum.photos/id/431/80/80",
    technologies: ["React", "Spring Boot"],
    status: "in-progress",
    teamSize: 4,
    duration: "3 mois",
  },
  {
    id: "PROJ-003",
    title: "Dashboard analytique",
    client: "DataPulse",
    image: "https://picsum.photos/id/409/80/80",
    technologies: ["Vue.js", "Python"],
    status: "featured",
    teamSize: 2,
    duration: "6 semaines",
  },
  {
    id: "PROJ-004",
    title: "Site vitrine ONG",
    client: "HumanAid",
    image: "https://picsum.photos/id/265/80/80",
    technologies: ["WordPress"],
    status: "completed",
    teamSize: 1,
    duration: "3 semaines",
  },
];

const statusConfig = {
  completed: { label: "Terminé", variant: "secondary" as const },
  "in-progress": { label: "En cours", variant: "default" as const },
  featured: { label: "Mis en avant", variant: "outline" as const },
};

export const ProjectsTable = () => {
  return (
    <Card className="w-full gap-5 pb-5 max-md:py-4!">
      <CardHeader className="max-md:px-4">
        <CardTitle>Projets récents</CardTitle>
        <CardDescription>
          Derniers projets livrés ou en cours de réalisation.
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" aria-label="Filtrer" className="max-md:hidden">
              <ListFilterIcon className="size-3.5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-sm" variant="outline" aria-label="Menu">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <NotepadTextIcon className="size-4" />
                    Voir le rapport
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileDownIcon className="size-4" />
                    Exporter CSV
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="max-md:px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Logo</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Technologies</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Équipe</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={project.image} alt={project.title} />
                    <AvatarFallback>{project.title.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex w-40 flex-col">
                    <p className="truncate font-medium">{project.title}</p>
                    <p className="text-muted-foreground text-xs">{project.client}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusConfig[project.status].variant} className="capitalize whitespace-nowrap">
                    {statusConfig[project.status].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="font-medium">{project.teamSize} dev{project.teamSize > 1 ? "s" : ""}</p>
                    <p className="text-muted-foreground text-xs">{project.duration}</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm">
                    <Edit2Icon className="size-3.5" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
