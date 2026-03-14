import { PrismaClient } from "@prisma/client";
import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert name → slug
function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

async function main() {
  console.log("📄 Reading Bike Services Excel...");

  const filePath = path.join(__dirname, "bike-services.xlsx");

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  // Ensure Bike vehicle type exists
  const bikeType = await prisma.vehicleType.upsert({
    where: { name: "Bike" },
    update: {},
    create: { name: "Bike" },
  });

  console.log("🚲 Vehicle Type:", bikeType.name);

  let currentMain = null;
  let currentSection = null;

  for (const row of rows) {
    // ==============================
    // MAIN SERVICE
    // ==============================
    if (row.mainService) {
      const mainSlug = slugify(row.mainService);

      currentMain = await prisma.mainService.upsert({
        where: { slug: mainSlug },
        update: {},
        create: {
          name: row.mainService,
          slug: mainSlug,
        },
      });

      console.log(`✅ Main Service: ${currentMain.name}`);
    }

    if (!currentMain) {
      console.warn("⚠ Skipping row — no Main Service defined.");
      continue;
    }

    // ==============================
    // SECTION
    // ==============================
    if (row.section) {
      const existingSection = await prisma.serviceSection.findFirst({
        where: {
          name: row.section,
          mainServiceId: currentMain.id,
        },
      });

      if (existingSection) {
        currentSection = existingSection;
      } else {
        currentSection = await prisma.serviceSection.create({
          data: {
            name: row.section,
            mainServiceId: currentMain.id,
          },
        });
      }

      console.log(`   ↳ Section: ${currentSection.name}`);
    }

    if (!currentSection) {
      console.warn("⚠ Skipping row — no Section defined.");
      continue;
    }

    // ==============================
    // SERVICE
    // ==============================
    if (row.serviceName) {
      const existing = await prisma.service.findFirst({
        where: {
          name: row.serviceName,
          sectionId: currentSection.id,
          vehicleTypeId: bikeType.id,
        },
      });

      if (existing) {
        console.log(`   ⚠ Service already exists: ${existing.name}`);
        continue;
      }

      const service = await prisma.service.create({
        data: {
          name: row.serviceName,
          price: Number(row.price) || 0,
          originalPrice: row.originalPrice ? Number(row.originalPrice) : null,
          description: row.description || null,
          sectionId: currentSection.id,
          vehicleTypeId: bikeType.id,
        },
      });

      console.log(`      ↳ Service: ${service.name}`);
    }
  }

  console.log("🎉 Bike services inserted successfully.");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
