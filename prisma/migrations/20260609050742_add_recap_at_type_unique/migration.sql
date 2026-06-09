/*
  Warnings:

  - A unique constraint covering the columns `[recapAt,type]` on the table `DailyRecap` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DailyRecap_recapAt_key";

-- CreateIndex
CREATE UNIQUE INDEX "DailyRecap_recapAt_type_key" ON "DailyRecap"("recapAt", "type");
