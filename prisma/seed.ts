import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.upsert({
    where: { email: "cody@mail.com" },
    update: {},
    create: {
      name: "Coder Codes",
      email: "cody@mail.com",
      token: "token",
      password:'12345678'
    },
  });
}

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
