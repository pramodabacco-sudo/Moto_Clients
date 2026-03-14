import serviceService from "../services/service.service.js";

/**
 * GET /api/services
 * Example:
 * /api/services?vehicleType=CAR
 * /api/services?vehicleType=BIKE
 */
export const getMainServices = async (req, res, next) => {
  try {
    const { vehicleType } = req.query;

    const data = await serviceService.getMainServices(vehicleType);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/services/:id
 * Example:
 * /api/services/:id?vehicleType=CAR
 */
export const getMainServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { vehicleType } = req.query;

    const data = await serviceService.getMainServiceById(id, vehicleType);

    if (!data) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/services/sub-services/:id
 * Example:
 * /api/services/sub-services/:id?vehicleType=CAR
 */
export const getSubServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { vehicleType } = req.query;

    const data = await serviceService.getSubServiceById(id, vehicleType);

    if (!data) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
