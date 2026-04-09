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
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { TechnologyRow } from "@/lib/query/technology.query";
import { Edit2, Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteTechnologyAction } from "@/actions/technology.action";
import { toast } from "sonner";

// ─── Category config (matching tech-stack-section colors) ─────────────

const CATEGORY_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  FRONTEND: {
    label: "Frontend",
    className:
      "bg-blue-50/70 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
  },
  BACKEND: {
    label: "Backend",
    className:
      "bg-green-50/70 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800",
  },
  MOBILE: {
    label: "Mobile",
    className:
      "bg-purple-50/70 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
  },
  DATABASE: {
    label: "Database",
    className:
      "bg-orange-50/70 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800",
  },
  DEVOPS: {
    label: "DevOps",
    className:
      "bg-muted/70 text-muted-foreground border-border dark:bg-muted dark:text-muted-foreground",
  },
  DESIGN: {
    label: "Design",
    className:
      "bg-pink-50/70 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800",
  },
  OTHER: {
    label: "Autre",
    className:
      "bg-zinc-50/70 text-zinc-700 border-zinc-200 dark:bg-zinc-950/40 dark:text-zinc-300 dark:border-zinc-800",
  },
};

// ─── Logo cell ───────────────────────────────────────────────────────────────

function TechLogo({
  logo,
  name,
}: {
  logo: string | null;
  name: string;
}) {
  if (logo) {
    return (
      <div className="flex size-9 items-center justify-center rounded-md border bg-muted p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} className="size-full object-contain" />
      </div>
    );
  }

  return (
    <div className="flex size-9 items-center justify-center rounded-md border bg-muted text-xs font-medium text-muted-foreground">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// ─── Actions cell ───────────────────────────────────────────────────────────────

function ActionsCell({ row }: { row: TechnologyRow }) {
  const router = useRouter();

  const { execute: deleteTech, isPending: isDeleting } = useAction(
    deleteTechnologyAction,
    {
      onSuccess: () => {
        toast.success("Technologie supprimée.");
      },
      onError: ({ error }) =>
        toast.error(error.serverError ?? "Erreur lors de la suppression"),
    }
  );

  const handleDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${row.name}" ?`)) {
      deleteTech({ id: row.id });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
        onClick={() => router.push(`/technologies/${row.id}/edit`)}
        title="Modifier"
      >
        <Edit2 className="size-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="text-red-600 hover:text-red-700 hover:bg-red-100"
        onClick={handleDelete}
        disabled={isDeleting}
        title="Supprimer"
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}

// ─── Columns ─────────────────────────────────────────────────────────────────

const columnHelper = createColumnHelper<TechnologyRow>();

const columns = [
  columnHelper.display({
    id: "logo",
    header: "",
    cell: ({ row }) => (
      <TechLogo logo={row.original.logo} name={row.original.name} />
    ),
  }),

  columnHelper.accessor("name", {
    header: "Nom",
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue()}</span>
    ),
  }),

  columnHelper.accessor("category", {
    header: "Catégorie",
    cell: ({ getValue }) => {
      const cfg = CATEGORY_CONFIG[getValue()] ?? {
        label: getValue(),
        className: "",
      };
      return (
        <Badge className={cfg.className} variant="outline">
          {cfg.label}
        </Badge>
      );
    },
  }),

  columnHelper.display({
    id: "projects",
    header: "Projets",
    cell: ({ row }) => {
      const count = row.original._count.projects;
      return (
        <span className="text-sm text-muted-foreground">
          {count} projet{count > 1 ? "s" : ""}
        </span>
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "Ajoutée le",
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell row={row.original} />,
  }),
];

// ─── Component ───────────────────────────────────────────────────────────────

export const TechnologiesDataTable = ({
  technologies,
  total,
  pages,
}: {
  technologies: TechnologyRow[];
  total: number;
  pages: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const table = useReactTable({
    data: technologies,
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center text-muted-foreground"
                >
                  Aucune technologie trouvée.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
