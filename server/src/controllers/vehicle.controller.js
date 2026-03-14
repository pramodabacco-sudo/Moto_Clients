import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carsPath = path.join(__dirname, "../data/cars-data.json");
const bikesPath = path.join(__dirname, "../data/bikes-data.json");

const getData = (type = "car") => {
  const filePath = type === "bike" ? bikesPath : carsPath;

  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// GET ALL BRANDS
export const getBrands = async (req, res) => {
  try {
    const { type = "car" } = req.query;

    const vehicles = getData(type);

    const brands = vehicles.map((b) => ({
      name: b.make,
      slug: b.slug,
      logoUrl: b.logoUrl,
    }));

    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch brands" });
  }
};

// GET MODELS OF A BRAND
export const getModels = async (req, res) => {
  try {
    const { brandSlug } = req.params;
    const { type = "car" } = req.query;

    const vehicles = getData(type);

    const brand = vehicles.find((b) => b.slug === brandSlug);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json(brand.models);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch models" });
  }
};
