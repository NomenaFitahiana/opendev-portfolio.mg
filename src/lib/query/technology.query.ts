import prisma from "@/lib/prisma";
import { TechCategory } from "~/prisma/generated/prisma/enums";

export type TechnologyFilters = {
  search?: string;
  category?: TechCategory;
  page?: number;
  limit?: number;
};

type TechnologyWithCount = {
  id: string;
  name: string;
  category: TechCategory;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: { projects: number };
};

export const getTechnologies = async (filters: TechnologyFilters = {}) => {
  const { search, category, page = 1, limit = 10 } = filters;

  const where = {
    ...(search && {
      name: { contains: search, mode: "insensitive" as const },
    }),
    ...(category && { category }),
  };

  const [technologies, total] = await Promise.all([
    prisma.technology.findMany({
      where,
      include: {
        _count: {
          select: { projects: true },
        },
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.technology.count({ where }),
  ]);

  return {
    technologies: technologies as TechnologyWithCount[],
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  };
};

export const getTechnologyStats = async () => {
  const [totalTechnologies, activeTechnologies, categories] = await Promise.all([
    prisma.technology.count(),
    prisma.technology.count({
      where: {
        projects: { some: {} },
      },
    }),
    prisma.technology.findMany({
      select: { category: true },
      distinct: ["category"],
    }),
  ]);

  return {
    totalTechnologies,
    activeTechnologies,
    categoriesCount: categories.length,
  };
};

export type TechnologyRow = {
  id: string;
  name: string;
  category: TechCategory;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: { projects: number };
};
