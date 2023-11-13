/*
  Warnings:

  - You are about to drop the column `dateOrdered` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_productId_fkey";

-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_userId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "dateOrdered",
ADD COLUMN     "dateUpdated" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "inWishlist" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "wishlist";
