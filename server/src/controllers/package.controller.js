import pkg from "pg";

const { Pool } = pkg;

// ✅ CRM DB (source of truth)
const db = new Pool({
  connectionString: process.env.MOTO_DB_URL,
});

export const getPackages = async (req, res) => {
  try {
    const { vehicleType } = req.query;

    const result = await db.query(
      `
      SELECT 
        p.id,
        p."userId", -- ✅ ADD THIS LINE: This is the missing Garage ID
        p.name,
        p.description,
        p.price,
        p."isActive",
        u."companyName" as "garageName",
        u.address, -- ✅ OPTIONAL: Add this to avoid "Address Not Available"
        u.phone,   -- ✅ OPTIONAL: Add this to avoid "Phone Not Available"

        json_agg(
          json_build_object(
            'serviceName', pi."serviceName"
          )
        ) as services

      FROM "MarketplacePackage" p

      LEFT JOIN "User" u 
        ON u.id = p."userId"

      LEFT JOIN "MarketplacePackageItem" pi 
        ON pi."packageId" = p.id

      WHERE p."isActive" = true
      ${
        vehicleType
          ? `AND EXISTS (
              SELECT 1 FROM "MarketplacePackageItem" mpi
              JOIN "MarketplaceService" ms 
                ON ms.id = mpi."serviceId"
              WHERE mpi."packageId" = p.id
              AND ms."crmType" = $1
            )`
          : ""
      }

      -- ✅ ADD p."userId", u.address, u.phone to GROUP BY
      GROUP BY p.id, u."companyName", u.address, u.phone 

      ORDER BY p."createdAt" DESC
      `,
      vehicleType ? [vehicleType.toUpperCase()] : [],
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error("GET PACKAGES ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch packages",
    });
  }
};
