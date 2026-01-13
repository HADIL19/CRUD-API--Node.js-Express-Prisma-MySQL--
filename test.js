import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: { name: "Alice", email: "alice@example.com" },
  });
  console.log("Created user:", user);

  // Get all users
  const users = await prisma.user.findMany();
  console.log("All users:", users);
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
