/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userName` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Files_fileType_idx";

-- DropIndex
DROP INDEX "Files_postId_idx";

-- DropIndex
DROP INDEX "Post_status_type_idx";

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "userName" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Files_postId_fileStatus_fileType_idx" ON "Files"("postId", "fileStatus", "fileType");

-- CreateIndex
CREATE INDEX "Post_status_createdAt_idx" ON "Post"("status", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userName_key" ON "UserProfile"("userName");
