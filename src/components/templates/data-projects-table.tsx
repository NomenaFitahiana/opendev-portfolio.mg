"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Copy } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { duplicateProjectAction } from "@/actions/project.action";
import { toast } from "sonner";
import { ProjectRow } from "@/lib/query/project.query";
import { DeleteProjectModal } from "./delete-project-modal";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const statusConfig = {
  COMPLETED: { label: "Terminé", variant: "secondary" as const },
  IN_PROGRESS: { label: "En cours", variant: "default" as const },
  FEATURED: { label: "Mis en avant", variant: "outline" as const },
};

const columnHelper = createColumnHelper<ProjectRow>();

const columns = [
  columnHelper.display({
    id: "image",
    header: "",
    cell: ({ row }) => (
      <Avatar className="h-9 w-9">
        <AvatarImage src={row.original.images[0]?.url} alt={row.original.title} />
        <AvatarFallback>{row.original.title.slice(0, 2)}</AvatarFallback>
      </Avatar>
    ),
  }),
  columnHelper.accessor("title", {
    header: "Projet",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.title}</span>
        <span className="text-muted-foreground text-xs">
          {row.original.hideClientName ? "Client masqué" : row.original.clientName}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Statut",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <Badge variant={statusConfig[status].variant}>
          {statusConfig[status].label}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("technologies", {
    header: "Technologies",
    cell: ({ getValue }) => (
      <div className="flex flex-wrap gap-1 max-w-48">
        {getValue()
          .slice(0, 3)
          .map((t) => (
            <Badge key={t.id} variant="secondary" className="text-xs">
              {t.name}
            </Badge>
          ))}
        {getValue().length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{getValue().length - 3}
          </Badge>
        )}
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Date",
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <ProjectRowActions row={row.original} />,
  }),
];

const ProjectRowActions = ({ row }: { row: ProjectRow }) => {
  const { execute, isPending } = useAction(duplicateProjectAction, {
    onSuccess: () => toast.success("Projet dupliqué."),
    onError: () => toast.error("Erreur lors de la duplication."),
  });

  return (
    <div className="flex items-center justify-end gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href={`/projects/${row.id}/edit`}>
              <Edit2 className="size-3.5" />
              <span className="sr-only">Modifier</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Modifier</span>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => execute({ id: row.id })}
            disabled={isPending}
          >
            <Copy className="size-3.5" />
            <span className="sr-only">Dupliquer</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Dupliquer</span>
        </TooltipContent>
      </Tooltip>
      <DeleteProjectModal id={row.id} title={row.title} />
    </div>
  );
};

export const ProjectsDataTable = ({
  projects,
  pages,
}: {
  projects: ProjectRow[];
  pages: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                  Aucun projet trouvé.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page <span className="text-foreground font-medium">{currentPage}</span> / {pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
};
