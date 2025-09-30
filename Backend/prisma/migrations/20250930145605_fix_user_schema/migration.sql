-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('VENDOR', 'DISTRIBUTOR');

-- Add columns with default values first
ALTER TABLE "public"."User" 
ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Default User',
ADD COLUMN "role" "public"."UserRole" NOT NULL DEFAULT 'VENDOR',
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing rows with proper values (if any exist)
UPDATE "public"."User" SET 
  "name" = CONCAT('User-', id),
  "role" = 'VENDOR'
WHERE "name" = 'Default User';

-- Now alter the table structure
ALTER TABLE "public"."User" 
ALTER COLUMN "id" SET DATA TYPE TEXT;

-- Create other tables
CREATE TABLE "public"."Vendor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gstNumber" TEXT,
    "company" TEXT,
    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Distributor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "region" TEXT,
    "warehouseId" TEXT,
    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE UNIQUE INDEX "Vendor_userId_key" ON "public"."Vendor"("userId");
CREATE UNIQUE INDEX "Distributor_userId_key" ON "public"."Distributor"("userId");

-- Add foreign keys
ALTER TABLE "public"."Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Distributor" ADD CONSTRAINT "Distributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;