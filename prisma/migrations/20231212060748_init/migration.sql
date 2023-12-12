/*
  Warnings:

  - You are about to drop the column `archived` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "archived",
ALTER COLUMN "dateOrdered" DROP DEFAULT;
