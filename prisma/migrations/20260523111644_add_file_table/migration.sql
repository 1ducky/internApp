/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('ACTIVE', 'TEMP', 'ORPHAN', 'DELETED');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'DOCUMENT', 'OTHER');

-- DropIndex
DROP INDEX "Post_id_idx";

-- DropIndex
DROP INDEX "Post_slug_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "Files" (
    "id" TEXT NOT NULL,
    "authorId" TEXT,
    "postId" TEXT,
    "fileName" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" "FileType" NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileStatus" "FileStatus" NOT NULL DEFAULT 'TEMP',
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Files_fileKey_key" ON "Files"("fileKey");

-- CreateIndex
CREATE INDEX "Files_fileType_idx" ON "Files"("fileType");

-- CreateIndex
CREATE INDEX "Files_fileStatus_createdAt_idx" ON "Files"("fileStatus", "createdAt");

-- CreateIndex
CREATE INDEX "Files_postId_idx" ON "Files"("postId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

-- CreateIndex
CREATE INDEX "Post_status_type_idx" ON "Post"("status", "type");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
