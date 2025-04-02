/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Artist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "imageUrl",
ADD COLUMN     "image_url" TEXT;
