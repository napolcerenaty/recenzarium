-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN     "dataSource" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "followersRequirement" TEXT NOT NULL DEFAULT '';
