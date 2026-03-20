import prisma from "@/lib/prisma";
import { ProjectStatus } from "~/prisma/generated/prisma/enums";

export type ProjectFilters = {
  search?: string;
  status?: ProjectStatus;
  technologyId?: string;
  page?: number;
  limit?: number;
};

export const getProjects = async (filters: ProjectFilters = {}) => {
  const { search, status, technologyId, page = 1, limit = 10 } = filters;

  const where = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { clientName: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(status && { status }),
    ...(technologyId && {
      technologies: { some: { id: technologyId } },
    }),
  };

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      include: {
        technologies: { select: { id: true, name: true } },
        images: { orderBy: { order: "asc" }, take: 1 },
      },
      orderBy: { order: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return { projects, total, pages: Math.ceil(total / limit) };
};

export const getProjectById = async (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: {
      technologies: true,
      images: { orderBy: { order: "asc" } },
    },
  });
};

export type ProjectRow = Awaited<
  ReturnType<typeof getProjects>
>["projects"][number];
