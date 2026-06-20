-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BANNED', 'DELETED');

-- CreateEnum
CREATE TYPE "BannedCode" AS ENUM ('SPAM', 'HARASSMENT', 'OFFENSIVE', 'OTHER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bannedCode" "BannedCode",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
