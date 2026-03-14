// auth.controller.js
import prisma from "../config/db.js";

// ─────────────────────────────────────────────
// GET /me  — full profile with address + vehicles
// ─────────────────────────────────────────────
export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        vehicles: true,
        address: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Shape the response to match what the frontend expects
    const { address, ...rest } = user;
    res.json({
      success: true,
      data: {
        ...rest,
        address: address ?? {},
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// PUT /me  — update all editable profile fields
// Body: { name, email, dob, company, taxNumber, registrationNumber, address: { street, city, state, postalCode, country } }
// ─────────────────────────────────────────────
export const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      email,
      dob,
      company,
      taxNumber,
      registrationNumber,
      address,
    } = req.body;

    // Build user update payload (only include defined fields)
    const userUpdateData = {};
    if (name !== undefined) userUpdateData.name = name;
    if (email !== undefined) userUpdateData.email = email;
    if (dob !== undefined) userUpdateData.dob = dob;
    if (company !== undefined) userUpdateData.company = company;
    if (taxNumber !== undefined) userUpdateData.taxNumber = taxNumber;
    if (registrationNumber !== undefined)
      userUpdateData.registrationNumber = registrationNumber;

    // Upsert address if provided
    if (address) {
      const { street, city, state, postalCode, country } = address;

      await prisma.userAddress.upsert({
        where: { userId: req.user.id },
        update: { street, city, state, postalCode, country },
        create: {
          userId: req.user.id,
          street,
          city,
          state,
          postalCode,
          country,
        },
      });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: userUpdateData,
      include: {
        vehicles: true,
        address: true,
      },
    });

    const { address: addr, ...rest } = updated;
    res.json({
      success: true,
      data: {
        ...rest,
        address: addr ?? {},
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// POST /vehicles  — add a vehicle
// ─────────────────────────────────────────────
export const addVehicle = async (req, res, next) => {
  try {
    const {
      vehicleType = "car",
      brandSlug,
      modelSlug,
      fuelType,
      registration,
    } = req.body;

    // 1. Find vehicle type
    const type = await prisma.vehicleType.findFirst({
      where: {
        name: {
          equals: vehicleType,
          mode: "insensitive",
        },
      },
    });

    if (!type) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vehicle type" });
    }

    // 2. Find brand
    const brand = await prisma.brand.findFirst({
      where: {
        name: {
          equals: brandSlug,
          mode: "insensitive",
        },
      },
    });

    if (!brand) {
      return res.status(400).json({ success: false, message: "Invalid brand" });
    }

    // 3. Find model
    const model = await prisma.model.findFirst({
      where: {
        brandId: brand.id,
        name: {
          equals: modelSlug,
          mode: "insensitive",
        },
      },
    });

    if (!model) {
      return res.status(400).json({ success: false, message: "Invalid model" });
    }

    // 4. Create vehicle with relation connections
    const vehicle = await prisma.vehicle.create({
      data: {
        user: {
          connect: { id: req.user.id },
        },
        vehicleType: {
          connect: { id: type.id },
        },
        brand: {
          connect: { id: brand.id },
        },
        model: {
          connect: { id: model.id },
        },
        fuelType: fuelType ?? null,
        registration: registration ?? null,
      },
    });

    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (err) {
    console.error("Vehicle create error:", err);
    next(err);
  }
};

// ─────────────────────────────────────────────
// GET /vehicles  — list user's vehicles
// ─────────────────────────────────────────────
export const getVehicles = async (req, res, next) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: req.user.id },
    });

    res.json({ success: true, data: vehicles });
  } catch (err) {
    next(err);
  }
};
