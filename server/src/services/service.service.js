import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Resolve vehicleType name → id
 */
const getVehicleTypeId = async (vehicleType) => {
  if (!vehicleType) return null;

  const type = await prisma.vehicleType.findFirst({
    where: {
      name: {
        equals: vehicleType,
        mode: "insensitive",
      },
    },
  });

  return type ? type.id : null;
};

/**
 * Get all main services
 * Supports vehicle filtering
 */
const getMainServices = async (vehicleType) => {
  const vehicleTypeId = await getVehicleTypeId(vehicleType);

  if (!vehicleTypeId) {
    return await prisma.mainService.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
  }

  return await prisma.mainService.findMany({
    where: {
      isActive: true,
      sections: {
        some: {
          services: {
            some: {
              vehicleTypeId,
              isActive: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

/**
 * Get one main service with sections + services
 * filtered by vehicle
 */
const getMainServiceById = async (id, vehicleType) => {
  const vehicleTypeId = await getVehicleTypeId(vehicleType);

  return await prisma.mainService.findUnique({
    where: { id },
    include: {
      sections: {
        include: {
          services: {
            where: {
              isActive: true,
              ...(vehicleTypeId && { vehicleTypeId }),
            },
            orderBy: { createdAt: "asc" },
          },
        },
      },
    },
  });
};

/**
 * Get one sub service
 * validate vehicle type
 */
const getSubServiceById = async (id, vehicleType) => {
  const vehicleTypeId = await getVehicleTypeId(vehicleType);

  return await prisma.service.findFirst({
    where: {
      id,
      ...(vehicleTypeId && { vehicleTypeId }),
    },
    include: {
      section: {
        include: {
          mainService: true,
        },
      },
    },
  });
};


/**
 * Search services by name, description, section, or main service name
 */
const searchServices = async (q, vehicleType) => {
  const vehicleTypeId = await getVehicleTypeId(vehicleType);

  return await prisma.service.findMany({
    where: {
      isActive: true,
      ...(vehicleTypeId && { vehicleTypeId }),
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { section: { name: { contains: q, mode: "insensitive" } } },
        { section: { mainService: { name: { contains: q, mode: "insensitive" } } } },
      ],
    },
    include: {
      section: {
        include: { mainService: true },
      },
      vehicleType: true,
    },
    orderBy: { name: "asc" },
    take: 30,
  });
};

export default {
  getMainServices,
  getMainServiceById,
  getSubServiceById,
  searchServices,
};
