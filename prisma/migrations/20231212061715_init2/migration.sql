/*
  Warnings:

  - You are about to drop the column `dateOrdered` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "dateOrdered",
ADD COLUMN     "ordered" BOOLEAN NOT NULL DEFAULT false;
