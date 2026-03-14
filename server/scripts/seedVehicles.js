import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

// Load vehicle JSON
const vehicles = JSON.parse(
  fs.readFileSync("./src/data/cars-data.json", "utf-8"),
);

/*
---------------------------------------
Segment Mapping
---------------------------------------
Maps JSON segments to your DB enum
*/
function mapSegment(segment) {
  if (!segment) return "SUV";

  const normalized = segment.toUpperCase().replace(/\s+/g, "_");

  const map = {
    HATCHBACK: "HATCHBACK",
    MICRO: "HATCHBACK",

    SEDAN: "SEDAN",

    SUV: "SUV",
    COMPACT_SUV: "SUV",
    SUV_COUPE: "SUV",
    MPV: "SUV",

    LUXURY: "LUXURY",
    SUPER_LUXURY: "SUPER_LUXURY",

    PICKUP: "PICKUP",
    VAN: "VAN",
  };

  return map[normalized] || "SUV";
}

async function seedVehicles() {
  console.log("🚀 Starting vehicle seeding...");

  const vehicleType = await prisma.vehicleType.findFirst({
    where: { name: "Car" },
  });

  if (!vehicleType) {
    throw new Error("VehicleType 'Car' not found in DB");
  }

  for (const brand of vehicles) {
    console.log(`📦 Processing brand: ${brand.make}`);

    const createdBrand = await prisma.brand.upsert({
      where: { name: brand.make },
      update: {},
      create: {
        name: brand.make,
        vehicleTypeId: vehicleType.id,
      },
    });

    for (const model of brand.models) {
      // check if model already exists
      const existingModel = await prisma.model.findFirst({
        where: {
          name: model.name,
          brandId: createdBrand.id,
        },
      });

      let createdModel;

      if (existingModel) {
        createdModel = existingModel;
      } else {
        createdModel = await prisma.model.create({
          data: {
            name: model.name,
            brandId: createdBrand.id,
            segment: mapSegment(model.segment),
          },
        });
      }

      if (model.yearVariants) {
        for (const year of Object.keys(model.yearVariants)) {
          const existingYear = await prisma.modelYear.findFirst({
            where: {
              modelId: createdModel.id,
              year: parseInt(year),
            },
          });

          if (existingYear) continue;

          await prisma.modelYear.create({
            data: {
              modelId: createdModel.id,
              year: parseInt(year),
              heroUrl: model.yearVariants[year]?.heroUrl || null,
              thumbnailUrl: model.yearVariants[year]?.thumbnailUrl || null,
            },
          });
        }
      }
    }
  }

  console.log("✅ Vehicles seeded successfully");
}

seedVehicles()
  .catch((error) => {
    console.error("❌ Seeder error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
