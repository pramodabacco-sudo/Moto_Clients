import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.vehicleType.createMany({
    data: [{ name: "Car" }, { name: "Bike" }],
    skipDuplicates: true,
  });

  console.log("✅ Vehicle types created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
