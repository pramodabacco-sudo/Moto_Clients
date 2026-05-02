/*
  Warnings:

  - You are about to drop the column `serviceType` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `serviceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FLAT');

-- CreateEnum
CREATE TYPE "VehicleSegment" AS ENUM ('HATCHBACK', 'SEDAN', 'SUV', 'LUXURY', 'SUPER_LUXURY', 'PICKUP', 'VAN');

-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE 'IN_PROGRESS';

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "serviceType",
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "dob" TEXT,
ADD COLUMN     "profileImage" BYTEA,
ADD COLUMN     "profileImageType" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postalCode" TEXT,
    "country" TEXT,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vehicleTypeId" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "segment" "VehicleSegment" NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleTypeId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "modelYearId" TEXT,
    "registration" TEXT,
    "fuelType" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MainService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mainServiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vehicleTypeId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "discountType" "DiscountType",
    "discountValue" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GarageService" (
    "id" TEXT NOT NULL,
    "garageId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "GarageService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModelYear" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "heroUrl" TEXT,
    "thumbnailUrl" TEXT,

    CONSTRAINT "ModelYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplaceService" (
    "id" SERIAL NOT NULL,
    "externalServiceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "MarketplaceService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GarageMarketplaceService" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "duration" INTEGER,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "GarageMarketplaceService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GarageServicePricing" (
    "id" SERIAL NOT NULL,
    "garage_user_id" INTEGER NOT NULL,
    "external_service_id" TEXT NOT NULL,
    "car_type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "garageServiceId" TEXT,
    "garageMarketplaceServiceId" INTEGER,

    CONSTRAINT "GarageServicePricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GarageServiceMeta" (
    "id" SERIAL NOT NULL,
    "garage_user_id" INTEGER NOT NULL,
    "external_service_id" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GarageServiceMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplaceBooking" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "garageId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "carType" TEXT,
    "finalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MarketplaceBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplacePackage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketplacePackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplacePackageItem" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "serviceName" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "MarketplacePackageItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userId_key" ON "UserAddress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE INDEX "Vehicle_userId_idx" ON "Vehicle"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MainService_slug_key" ON "MainService"("slug");

-- CreateIndex
CREATE INDEX "Service_vehicleTypeId_idx" ON "Service"("vehicleTypeId");

-- CreateIndex
CREATE INDEX "GarageService_serviceId_idx" ON "GarageService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "GarageService_garageId_serviceId_key" ON "GarageService"("garageId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ModelYear_modelId_year_key" ON "ModelYear"("modelId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "MarketplaceService_externalServiceId_key" ON "MarketplaceService"("externalServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "GarageMarketplaceService_userId_serviceId_key" ON "GarageMarketplaceService"("userId", "serviceId");

-- CreateIndex
CREATE INDEX "GarageServicePricing_external_service_id_idx" ON "GarageServicePricing"("external_service_id");

-- CreateIndex
CREATE INDEX "GarageServicePricing_garage_user_id_idx" ON "GarageServicePricing"("garage_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "GarageServicePricing_garage_user_id_external_service_id_car_key" ON "GarageServicePricing"("garage_user_id", "external_service_id", "car_type");

-- CreateIndex
CREATE INDEX "GarageServiceMeta_garage_user_id_idx" ON "GarageServiceMeta"("garage_user_id");

-- CreateIndex
CREATE INDEX "GarageServiceMeta_external_service_id_idx" ON "GarageServiceMeta"("external_service_id");

-- CreateIndex
CREATE UNIQUE INDEX "GarageServiceMeta_garage_user_id_external_service_id_key" ON "GarageServiceMeta"("garage_user_id", "external_service_id");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_modelYearId_fkey" FOREIGN KEY ("modelYearId") REFERENCES "ModelYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceSection" ADD CONSTRAINT "ServiceSection_mainServiceId_fkey" FOREIGN KEY ("mainServiceId") REFERENCES "MainService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ServiceSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarageService" ADD CONSTRAINT "GarageService_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarageService" ADD CONSTRAINT "GarageService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModelYear" ADD CONSTRAINT "ModelYear_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarageMarketplaceService" ADD CONSTRAINT "GarageMarketplaceService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "MarketplaceService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarageServicePricing" ADD CONSTRAINT "GarageServicePricing_garageServiceId_fkey" FOREIGN KEY ("garageServiceId") REFERENCES "GarageService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GarageServicePricing" ADD CONSTRAINT "GarageServicePricing_garageMarketplaceServiceId_fkey" FOREIGN KEY ("garageMarketplaceServiceId") REFERENCES "GarageMarketplaceService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketplaceBooking" ADD CONSTRAINT "MarketplaceBooking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "MarketplaceService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketplacePackageItem" ADD CONSTRAINT "MarketplacePackageItem_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "MarketplacePackage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketplacePackageItem" ADD CONSTRAINT "MarketplacePackageItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "MarketplaceService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
