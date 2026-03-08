import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { hash } from "@node-rs/argon2";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const ADMIN = {
  name: process.env.SEED_ADMIN_NAME!,
  email: process.env.SEED_ADMIN_EMAIL!,
  password: process.env.SEED_ADMIN_PASSWORD!,
};

async function main() {
  console.log("Seeding admin user...");

  const existing = await prisma.user.findUnique({
    where: { email: ADMIN.email },
  });

  if (existing) {
    console.log(`User ${ADMIN.email} already exists.`);

    await prisma.user.update({
      where: { id: existing.id },
      data: { role: "admin" },
    });

    console.log(`Ensured admin role for ${ADMIN.email}`);
    return;
  }

  const hashedPassword = await hash(ADMIN.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const user = await prisma.user.create({
    data: {
      name: ADMIN.name,
      email: ADMIN.email,
      emailVerified: true,
      role: "admin",
      accounts: {
        create: {
          accountId: ADMIN.email,
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  console.log(`Admin user created: ${user.email} (id: ${user.id})`);
  console.log(`Remember to change the password after first login!`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  