-- AlterTable
ALTER TABLE "Publisher" ADD COLUMN     "collaborationInfo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "collaborationUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isImprint" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "tiktokUrl" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Publisher" ADD CONSTRAINT "Publisher_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
