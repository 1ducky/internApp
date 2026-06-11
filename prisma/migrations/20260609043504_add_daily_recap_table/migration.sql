-- CreateEnum
CREATE TYPE "RecapType" AS ENUM ('POST', 'USER');

-- CreateTable
CREATE TABLE "DailyRecap" (
    "id" TEXT NOT NULL,
    "recapAt" TIMESTAMP(3) NOT NULL,
    "type" "RecapType" NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyRecap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyRecap_recapAt_key" ON "DailyRecap"("recapAt");

-- CreateIndex
CREATE INDEX "DailyRecap_recapAt_type_idx" ON "DailyRecap"("recapAt", "type");
