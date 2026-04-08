import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { TechCategory } from "./generated/prisma/enums";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const TECHNOLOGIES = [
  { name: "React", category: TechCategory.FRONTEND },
  { name: "Next.js", category: TechCategory.FRONTEND },
  { name: "Vue.js", category: TechCategory.FRONTEND },
  { name: "Angular", category: TechCategory.FRONTEND },
  { name: "Svelte", category: TechCategory.FRONTEND },
  { name: "TypeScript", category: TechCategory.FRONTEND },
  { name: "JavaScript", category: TechCategory.FRONTEND },
  { name: "HTML", category: TechCategory.FRONTEND },
  { name: "CSS", category: TechCategory.FRONTEND },
  { name: "Tailwind CSS", category: TechCategory.FRONTEND },
  { name: "Sass", category: TechCategory.FRONTEND },
  { name: "Figma", category: TechCategory.DESIGN },
  { name: "Adobe XD", category: TechCategory.DESIGN },
  { name: "Sketch", category: TechCategory.DESIGN },
  { name: "InVision", category: TechCategory.DESIGN },
  { name: "Node.js", category: TechCategory.BACKEND },
  { name: "Python", category: TechCategory.BACKEND },
  { name: "Django", category: TechCategory.BACKEND },
  { name: "FastAPI", category: TechCategory.BACKEND },
  { name: "Express.js", category: TechCategory.BACKEND },
  { name: "NestJS", category: TechCategory.BACKEND },
  { name: "Java", category: TechCategory.BACKEND },
  { name: "Spring Boot", category: TechCategory.BACKEND },
  { name: "C#", category: TechCategory.BACKEND },
  { name: ".NET", category: TechCategory.BACKEND },
  { name: "Go", category: TechCategory.BACKEND },
  { name: "Ruby", category: TechCategory.BACKEND },
  { name: "Ruby on Rails", category: TechCategory.BACKEND },
  { name: "PHP", category: TechCategory.BACKEND },
  { name: "Laravel", category: TechCategory.BACKEND },
  { name: "PostgreSQL", category: TechCategory.DATABASE },
  { name: "MySQL", category: TechCategory.DATABASE },
  { name: "MongoDB", category: TechCategory.DATABASE },
  { name: "Redis", category: TechCategory.DATABASE },
  { name: "Prisma", category: TechCategory.DATABASE },
  { name: "SQLite", category: TechCategory.DATABASE },
  { name: "Firebase", category: TechCategory.DATABASE },
  { name: "Supabase", category: TechCategory.DATABASE },
  { name: "React Native", category: TechCategory.MOBILE },
  { name: "Flutter", category: TechCategory.MOBILE },
  { name: "Swift", category: TechCategory.MOBILE },
  { name: "Kotlin", category: TechCategory.MOBILE },
  { name: "Expo", category: TechCategory.MOBILE },
  { name: "Ionic", category: TechCategory.MOBILE },
  { name: "Docker", category: TechCategory.DEVOPS },
  { name: "Kubernetes", category: TechCategory.DEVOPS },
  { name: "AWS", category: TechCategory.DEVOPS },
  { name: "Vercel", category: TechCategory.DEVOPS },
  { name: "Netlify", category: TechCategory.DEVOPS },
  { name: "CI/CD", category: TechCategory.DEVOPS },
  { name: "Git", category: TechCategory.DEVOPS },
  { name: "GitHub Actions", category: TechCategory.DEVOPS },
  { name: "Hasura", category: TechCategory.OTHER },
  { name: "GraphQL", category: TechCategory.OTHER },
  { name: "REST API", category: TechCategory.OTHER },
  { name: "WebSockets", category: TechCategory.OTHER },
];

async function main() {
  console.log("Seeding technologies...");

  let created = 0;
  let skipped = 0;

  for (const tech of TECHNOLOGIES) {
    const existing = await prisma.technology.findUnique({
      where: { name: tech.name },
    });

    if (existing) {
      console.log(`Skipping: ${tech.name} (already exists)`);
      skipped++;
      continue;
    }

    await prisma.technology.create({
      data: tech,
    });

    console.log(`Created: ${tech.name} (${tech.category})`);
    created++;
  }

  console.log(`\nDone! ${created} created, ${skipped} skipped.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });