import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

// load bike json
const bikes = JSON.parse(
  fs.readFileSync("./src/data/bikes-data.json", "utf-8"),
);

async function seedBikes() {
  const vehicleType = await prisma.vehicleType.findFirst({
    where: { name: "Bike" },
  });

  if (!vehicleType) {
    throw new Error("VehicleType 'Bike' not found in DB");
  }

  for (const brand of bikes) {
    const createdBrand = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: {
        name: brand.make,
        slug: brand.slug,
        vehicleTypeId: vehicleType.id,
      },
    });

    for (const model of brand.models) {
      await prisma.model.create({
        data: {
          name: model.name,
          slug: model.slug,
          brandId: createdBrand.id,
          segment: "BIKE",
        },
      });
    }
  }

  console.log("✅ Bikes seeded successfully");
}

seedBikes()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
